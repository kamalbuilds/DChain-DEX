// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@thirdweb-dev/contracts/base/ERC20Base.sol";

contract DCHAINV2DEX is ERC20Base {
    uint256 public feePercent; // Fee percentage in basis points (100 basis points = 1%)

    mapping(address => uint256) public tokenReserves; // Mapping from token address to reserves
    mapping(address => mapping(address => uint256)) public liquidity; // Mapping from user to token address to liquidity provided

    event LiquidityAdded(address indexed provider, address indexed token, uint256 amountEth, uint256 amountToken);
    event LiquidityRemoved(address indexed provider, address indexed token, uint256 amountEth, uint256 amountToken);
    event Swapped(address indexed swapper, address indexed token, uint256 amountIn, uint256 amountOut, string direction);

    constructor (uint256 _feePercent) ERC20Base(msg.sender, "DCHAINV1DEX", "DCDX") {
        feePercent = _feePercent;
    }

    function getTokensInContract(address token) public view returns (uint256) {
        return ERC20Base(token).balanceOf(address(this));
    }

    function addLiquidity(address token, uint256 _amount) public payable returns (uint256) {
        uint256 _liquidity;
        uint256 balanceInEth = address(this).balance;
        uint256 tokenReserve = getTokensInContract(token);
        ERC20Base _token = ERC20Base(token);

        if (tokenReserve == 0) {
            _token.transferFrom(msg.sender, address(this), _amount);
            _liquidity = balanceInEth;
            _mint(msg.sender, _amount);
        } else {
            uint256 reservedEth = balanceInEth - msg.value;
            require(
                _amount >= (msg.value * tokenReserve) / reservedEth,
                "Amount of tokens sent is less than the minimum tokens required"
            );
            _token.transferFrom(msg.sender, address(this), _amount);
            unchecked {
                _liquidity = (totalSupply() * msg.value) / reservedEth;
            }
            _mint(msg.sender, _liquidity);
        }

        tokenReserves[token] += _amount;
        liquidity[msg.sender][token] += _amount;
        emit LiquidityAdded(msg.sender, token, msg.value, _amount);
        return _liquidity;
    }

    function removeLiquidity(address token, uint256 _amount) public returns (uint256, uint256) {
        require(_amount > 0, "Amount should be greater than zero");
        uint256 _reservedEth = address(this).balance;
        uint256 _totalSupply = totalSupply();

        uint256 _ethAmount = (_reservedEth * _amount) / _totalSupply;
        uint256 _tokenAmount = (getTokensInContract(token) * _amount) / _totalSupply;
        _burn(msg.sender, _amount);
        payable(msg.sender).transfer(_ethAmount);
        ERC20Base(token).transfer(msg.sender, _tokenAmount);

        tokenReserves[token] -= _tokenAmount;
        liquidity[msg.sender][token] -= _tokenAmount;
        emit LiquidityRemoved(msg.sender, token, _ethAmount, _tokenAmount);
        return (_ethAmount, _tokenAmount);
    }

    function getAmountOfTokens(
        uint256 inputAmount,
        uint256 inputReserve,
        uint256 outputReserve
    )
    public view returns (uint256) 
    {
        require(inputReserve > 0 && outputReserve > 0, "Invalid Reserves");
        uint256 inputAmountWithFee = (inputAmount * (10000 - feePercent)) / 10000;
        uint256 numerator = inputAmountWithFee * outputReserve;
        uint256 denominator = (inputReserve * 10000) + inputAmountWithFee;
        unchecked {
            return numerator / denominator;
        }
    }

    function swapEthToToken(address token, uint256 minTokens) public payable {
        uint256 _reservedTokens = getTokensInContract(token);
        uint256 _tokensBought = getAmountOfTokens(
            msg.value, 
            address(this).balance - msg.value, 
            _reservedTokens
        );
        require(_tokensBought >= minTokens, "Insufficient output amount");
        ERC20Base(token).transfer(msg.sender, _tokensBought);
        emit Swapped(msg.sender, token, msg.value, _tokensBought, "ETH to Token");
    }

    function swapTokenToEth(address token, uint256 _tokensSold, uint256 minEth) public {
        uint256 _reservedTokens = getTokensInContract(token);
        uint256 ethBought = getAmountOfTokens(
            _tokensSold,
            _reservedTokens,
            address(this).balance
        );
        require(ethBought >= minEth, "Insufficient output amount");
        ERC20Base(token).transferFrom(
            msg.sender, 
            address(this), 
            _tokensSold
        );
        payable(msg.sender).transfer(ethBought);
        emit Swapped(msg.sender, token, _tokensSold, ethBought, "Token to ETH");
    }
}
