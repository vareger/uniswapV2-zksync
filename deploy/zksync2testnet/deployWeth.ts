import { Wallet, utils } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the WETH9 contract`);

  const adminPrivateKey = ethers.Wallet.fromMnemonic(hre.config.env.MNEMONIC, `m/44'/60'/0'/0/0`).privateKey;
  const wallet = new Wallet(adminPrivateKey);

  const deployer = new Deployer(hre, wallet);
  const WETH9Artifact = await deployer.loadArtifact("WETH9");

  const weth9 = await deployer.deploy(WETH9Artifact, []);

  console.log("constructor args:" + weth9.interface.encodeDeploy([]));

  const weth9Address = weth9.address;
  console.log(`${WETH9Artifact.contractName} was deployed to ${weth9Address}`);
}