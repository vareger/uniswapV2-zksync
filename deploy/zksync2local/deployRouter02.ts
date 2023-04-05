import { Wallet, utils } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the UniswapV2Router02 contract`);

  const adminPrivateKey = '0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110'
  const wallet = new Wallet(adminPrivateKey);

  const deployer = new Deployer(hre, wallet);
  const UniswapV2Router02Artifact = await deployer.loadArtifact("UniswapV2Router02");

  let _factory = "0x1F0151386fB0AbBF0273238dF5E9bc519DE5e20B";
  let _WETH = "0x5B11c36bf87ED2EAc102C42E9528eC99D77f7aFd";
  const uniswapV2Router02 = await deployer.deploy(UniswapV2Router02Artifact, [_factory, _WETH]);


  const uniswapV2Router02Address = uniswapV2Router02.address;
  console.log(`${UniswapV2Router02Artifact.contractName} was deployed to ${uniswapV2Router02Address}`);
}