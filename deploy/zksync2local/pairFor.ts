import { Wallet, utils, Contract, Web3Provider, Provider } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
    console.log(`Running read script for the UniswapV2Factory contract`);

    const uniswapV2Router02Address = '0xb76eD02Dea1ba444609602BE5D587c4bFfd67153'
    const adminPrivateKey = '0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110'
    
    const provider = new Provider(hre.config.networks.zkSyncLocal.url);
    const wallet = new Wallet(adminPrivateKey, provider);
    
    const deployer = new Deployer(hre, wallet);
    const UniswapV2Router02Artifact = await deployer.loadArtifact("UniswapV2Router02");

    const uniswapV2Router02 = new Contract(uniswapV2Router02Address, UniswapV2Router02Artifact.abi, wallet)
   

    let factory = '0x111C3E89Ce80e62EE88318C2804920D4c96f92bb'
    let tokenA = '0x4B5DF730c2e6b28E17013A1485E5d9BC41Efe021'
    let tokenB = '0x26b368C3Ed16313eBd6660b72d8e4439a697Cb0B'
    let pairAddress = await uniswapV2Router02.pairFor(factory, tokenA, tokenB);
    console.log("pairFor: " + pairAddress)

}