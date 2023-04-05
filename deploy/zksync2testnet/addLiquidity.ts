import { Wallet, utils, Contract, Web3Provider, Provider } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
    console.log(`Running addLiquidity for the UniswapV2Router02 contract`);

    const uniswapV2Router02Address = '0x43F777E5ef0283c272dC350a301D4ec2D9e140BE'

    const adminPrivateKey = Wallet.fromMnemonic(hre.config.env.MNEMONIC, `m/44'/60'/0'/0/0`).privateKey;
    
    const provider = new Provider(hre.config.networks.zkSyncTestnet.url);
    const wallet = new Wallet(adminPrivateKey, provider);
    
    const deployer = new Deployer(hre, wallet);
    const UniswapV2Router02Artifact = await deployer.loadArtifact("UniswapV2Router02");

    const uniswapV2Router02 = new Contract(uniswapV2Router02Address, UniswapV2Router02Artifact.abi, wallet)
   
/** function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
 */

    let tokenA = "0xEFeba2CFB0b5d155aeeE6933b41e993E7f7dcFad" // TKN1
    let tokenB = "0x6DeB162E564DA5b0434bfD0D728AC4c4F52b57aB" // TKN2
    let amountADesired = '9000000000000000000' // 9 TKN1
    let amountBDesired = '13000000000000000000' // 13 TKN2
    let amountAMin = '0'
    let amountBMin = '0'
    let to = '0xC04d245263fF5459CeA78C1800fdc69BD11B4b59'
    let deadline = 1779497740 

    const tx = await uniswapV2Router02.addLiquidity(
        tokenA,
        tokenB,
        amountADesired,
        amountBDesired,
        amountAMin,
        amountBMin,
        to,
        deadline
    )
    console.log(tx);

}