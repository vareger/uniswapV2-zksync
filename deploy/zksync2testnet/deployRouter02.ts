import { Wallet, utils } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the UniswapV2Router02 contract`);

  const adminPrivateKey = ethers.Wallet.fromMnemonic(hre.config.env.MNEMONIC, `m/44'/60'/0'/0/0`).privateKey;
  const wallet = new Wallet(adminPrivateKey);

  const deployer = new Deployer(hre, wallet);
  const UniswapV2Router02Artifact = await deployer.loadArtifact("UniswapV2Router02");

  let _factory = "0x9A3F94a51CEB1600C29101294dFF4df388f95D8B";
  let _WETH = "0xE75aD77635AFb7b81ca0fa968F6EbdAfbD21031e";
  const uniswapV2Router02 = await deployer.deploy(UniswapV2Router02Artifact, [_factory, _WETH]);

  console.log("constructor args:" + uniswapV2Router02.interface.encodeDeploy([_factory, _WETH]));

  const uniswapV2Router02Address = uniswapV2Router02.address;
  console.log(`${UniswapV2Router02Artifact.contractName} was deployed to ${uniswapV2Router02Address}`);
}