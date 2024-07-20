# Dchain DEX contracts

## Compiling the contract

Use the following command to compile the contract:

```bash
npx hardhat build
```

## Deploying the contract

Use the following command to deploy the contract to any EVM chain:

```bash
npx hardhat deploy
```


### Changes Made in V2:
1. **Added Mapping for Token Reserves**: `mapping(address => uint256) public tokenReserves;` to keep track of reserves for each token.
2. **Added Mapping for Liquidity**: `mapping(address => mapping(address => uint256)) public liquidity;` to keep track of liquidity provided by each user for each token.
3. **Modified Functions to Accept Token Address**: Updated functions `addLiquidity`, `removeLiquidity`, `swapEthToToken`, and `swapTokenToEth` to accept a token address parameter.
4. **Updated Events**: Modified events to include token address.

These changes allow the contract to support multiple tokens by dynamically managing token reserves and user liquidity for each token.