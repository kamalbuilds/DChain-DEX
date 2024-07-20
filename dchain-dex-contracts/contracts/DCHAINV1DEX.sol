// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@thirdweb-dev/contracts/base/ERC20Base.sol";

contract DCHAINV1DEX is ERC20Base {
    address public token; // this token would be utilsed 
    uint256 public feePercent; // Fee percentage in basis points (100 basis points = 1%)

    event LiquidityAdded(address indexed provider, uint256 amountEth, uint256 amountToken);
    event LiquidityRemoved(address indexed provider, uint256 amountEth, uint256 amountToken);
    event Swapped(address indexed swapper, uint256 amountIn, uint256 amountOut, string direction);

    constructor (address _token, uint256 _feePercent) ERC20Base(msg.sender, name(), symbol()) {
        token = _token;
        feePercent = _feePercent;
    }

    function getTokensInContract() public view returns (uint256) {
        return ERC20Base(token).balanceOf(address(this));
    }

    function addLiquidity(uint256 _amount) public payable returns (uint256) {
        uint256 _liquidity;
        uint256 balanceInEth = address(this).balance;
        uint256 tokenReserve = getTokensInContract();
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
        emit LiquidityAdded(msg.sender, msg.value, _amount);
        return _liquidity;
    }

    function removeLiquidity(uint256 _amount) public returns (uint256, uint256) {
        require(_amount > 0, "Amount should be greater than zero");
        uint256 _reservedEth = address(this).balance;
        uint256 _totalSupply = totalSupply();

        uint256 _ethAmount = (_reservedEth * _amount) / totalSupply();
        uint256 _tokenAmount = (getTokensInContract() * _amount) / _totalSupply;
        _burn(msg.sender, _amount);
        payable(msg.sender).transfer(_ethAmount);
        ERC20Base(token).transfer(msg.sender, _tokenAmount);
        emit LiquidityRemoved(msg.sender, _ethAmount, _tokenAmount);
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

    function swapEthTotoken(uint256 minTokens) public payable {
        uint256 _reservedTokens = getTokensInContract();
        uint256 _tokensBought = getAmountOfTokens(
            msg.value, 
            address(this).balance - msg.value, 
            _reservedTokens
        );
        require(_tokensBought >= minTokens, "Insufficient output amount");
        ERC20Base(token).transfer(msg.sender, _tokensBought);
        emit Swapped(msg.sender, msg.value, _tokensBought, "ETH to Token");
    }

    function swapTokenToEth(uint256 _tokensSold, uint256 minEth) public {
        uint256 _reservedTokens = getTokensInContract();
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
        emit Swapped(msg.sender, _tokensSold, ethBought, "Token to ETH");
    }
}
