import { Wallet, utils } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

/**
 $ yarn hardhat deploy-zksync --script zksync2local/deployWeth.ts --network zkSyncLocal
 */
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the WETH9 contract`);

  const adminPrivateKey = '0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110'
  const wallet = new Wallet(adminPrivateKey);

  const deployer = new Deployer(hre, wallet);
  const WETH9Artifact = await deployer.loadArtifact("WETH9");

  const weth9 = await deployer.deploy(WETH9Artifact, []);

  console.log("constructor args:" + weth9.interface.encodeDeploy([]));

  const weth9Address = weth9.address;
  console.log(`${WETH9Artifact.contractName} was deployed to ${weth9Address}`);
}