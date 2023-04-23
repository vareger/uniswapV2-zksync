# Uniswap V2 port for ZKSync by Vareger.com

## ZKSync Testnet Deployment:

| Contract | Address |
| ----------- | ----------- |
| WETH | [0x20b28B1e4665FFf290650586ad76E977EAb90c5D](https://goerli.explorer.zksync.io/address/0x20b28B1e4665FFf290650586ad76E977EAb90c5D) |
| UniswapV2Factory | [0xC2C1E272b884e7a3CE08a035428c7CB1f51cb60e](https://goerli.explorer.zksync.io/address/0xC2C1E272b884e7a3CE08a035428c7CB1f51cb60e) |
| UniswapV2Router02 | [0x707413d632138E4a123A2BD55DbF9a46827708EB](https://goerli.explorer.zksync.io/address/0x707413d632138E4a123A2BD55DbF9a46827708EB) |

## Test on a local node: 
you can find base tutorial on starting up the local node here:
https://github.com/matter-labs/local-setup

In order to compile the project:
1. yarn
1. cp .env.example .env
1. fill .env with your data
1. yarn hardhat compile

Run the local node:
1. git clone https://github.com/matter-labs/local-setup
1. cd local-setup
1. chmod +x ./start.sh
1. Make sure you have docker daemon enabled. 
1. ./start.sh

Check test scripts [here:](./deploy/zksync2local/)

Use at your own risk.

Need help porting your solidity code to zksync? [info@vareger.com](mailto:info@vareger.com)
