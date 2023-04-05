import { Wallet, utils, Contract, Web3Provider, Provider } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
    console.log(`Running addLiquidity for the UniswapV2Router02 contract`);

    const uniswapV2Router02Address = '0x29c6fF2E3D04a9f37e7af1fF9b38C9E2e9079FfA'
    let token1Address = "0x4B5DF730c2e6b28E17013A1485E5d9BC41Efe021" // TKN1
    let token2Address = "0x26b368C3Ed16313eBd6660b72d8e4439a697Cb0B" // TKN2
    const adminPrivateKey = '0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110'
    
    const provider = new Provider(hre.config.networks.zkSyncLocal.url);
    const wallet = new Wallet(adminPrivateKey, provider);
    
    const deployer = new Deployer(hre, wallet);
    const UniswapV2Router02Artifact = await deployer.loadArtifact("UniswapV2Router02");
    const ERC20 = await deployer.loadArtifact("ERC20");

    const uniswapV2Router02 = new Contract(uniswapV2Router02Address, UniswapV2Router02Artifact.abi, wallet)
    const token1 = new Contract(token1Address, ERC20.abi, wallet);
    const token2 = new Contract(token2Address, ERC20.abi, wallet);

    let amount = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
    let tx1_approve = await token1.approve(uniswapV2Router02Address, amount)
    let tx2_approve = await token2.approve(uniswapV2Router02Address, amount)
    console.log(tx1_approve)
    console.log(tx2_approve)

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

    let tokenA = "0x4B5DF730c2e6b28E17013A1485E5d9BC41Efe021" // TKN1
    let tokenB = "0x26b368C3Ed16313eBd6660b72d8e4439a697Cb0B" // TKN2
    let amountADesired = '1000000000000000000' // 1 TKN1
    let amountBDesired = '3000000000000000000' // 3 TKN2
    let amountAMin = '0'
    let amountBMin = '0'
    let to = wallet.address
    let deadline = 99999999999999 

    // const tx = await uniswapV2Router02.addLiquidity(
    //     tokenA,
    //     tokenB,
    //     amountADesired,
    //     amountBDesired,
    //     amountAMin,
    //     amountBMin,
    //     to,
    //     deadline,
    //     {
    //         gasLimit: "44337370"
    //     }
    // )
    // console.log(tx);

}