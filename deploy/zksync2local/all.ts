import { Wallet, utils, Contract, Web3Provider, Provider } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

/**
 * $ yarn hardhat deploy-zksync --script zksync2local/all.ts --network zkSyncLocal
 */
export default async function (hre: HardhatRuntimeEnvironment) {
    console.log(`Running all testcase scenario`);

    const adminPrivateKey = '0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110'
    
    const provider = new Provider(hre.config.networks.zkSyncLocal.url);
    const wallet = new Wallet(adminPrivateKey, provider);
    const deployer = new Deployer(hre, wallet);

    console.log("Wallet address: " + wallet.address)

    const UniswapV2Factory = await deployer.loadArtifact("UniswapV2Factory");
    const UniswapV2Router02 = await deployer.loadArtifact("UniswapV2Router02");
    const WETH9 = await deployer.loadArtifact("WETH9");
    const ERC20 = await deployer.loadArtifact("ERC20");

    let weth = await deployer.deploy(WETH9, []);
    let uniswapV2Factory = await deployer.deploy(UniswapV2Factory, [wallet.address])
    let uniswapV2Router02 = await deployer.deploy(UniswapV2Router02, [uniswapV2Factory.address, weth.address]);
    let token1 = await deployer.deploy(ERC20, ["Token1", "TKN1", '8888888000000000000000000']);
    let token2 = await deployer.deploy(ERC20, ["Token2", "TKN2", '9999999000000000000000000']);

    console.log("WETH: " + weth.address)
    console.log("UniswapV2Factory: " + uniswapV2Factory.address)
    console.log("UniswapV2Router02: " + uniswapV2Router02.address)
    console.log("Token1: " + token1.address)
    console.log("Token2: " + token2.address)

    console.log("Token1 name: " + await token1.name())
    console.log("Token2 name: " + await token2.name())
    token1 = new Contract(token1.address, ERC20.abi, wallet)
    token2 = new Contract(token2.address, ERC20.abi, wallet)
    uniswapV2Factory = new Contract(uniswapV2Factory.address, UniswapV2Factory.abi, wallet)
    uniswapV2Router02 = new Contract(uniswapV2Router02.address, UniswapV2Router02.abi, wallet)

    let INIT_CODE_HASH = await uniswapV2Factory.INIT_CODE_HASH();
    console.log("INIT_CODE_HASH: " + INIT_CODE_HASH)

    let token1_allowance_before = await token1.allowance(wallet.address, uniswapV2Router02.address)
    let token2_allowance_before = await token2.allowance(wallet.address, uniswapV2Router02.address)
    console.log("token1_allowance_before: " + token1_allowance_before)
    console.log("token2_allowance_before: " + token2_allowance_before)

    let amount = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
    let tx1_approve = await token1.approve(uniswapV2Router02.address, amount)
    let tx2_approve = await token2.approve(uniswapV2Router02.address, amount)

    await new Promise(r => setTimeout(r, 2000));

    let token1_allowance_after = await token1.allowance(wallet.address, uniswapV2Router02.address)
    let token2_allowance_after = await token2.allowance(wallet.address, uniswapV2Router02.address)
    console.log("token1_allowance_after: " + token1_allowance_after)
    console.log("token2_allowance_after: " + token2_allowance_after)

    console.log("balance of token1: " + await token1.balanceOf(wallet.address))
    console.log("balance of token2: " + await token2.balanceOf(wallet.address))

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

    let tokenA = token1.address // TKN1
    let tokenB = token2.address // TKN2
    let amountADesired = '1000000000000000000' // 1 TKN1
    let amountBDesired = '3000000000000000000' // 3 TKN2
    let amountAMin = '0'
    let amountBMin = '0'
    let to = wallet.address
    let deadline = 99999999999999 

    console.log("TokenA: " + tokenA)
    console.log("TokenB: " + tokenB)

    const tx = await uniswapV2Router02.addLiquidity(
        tokenA,
        tokenB,
        amountADesired,
        amountBDesired,
        amountAMin,
        amountBMin,
        to,
        deadline//,
        // {
        //     gasLimit: "44337370"
        // }
    )
    console.log(tx);

    await new Promise(r => setTimeout(r, 2000));

    console.log("pair: " + (await uniswapV2Factory.getPair(token1.address, token2.address)))
    console.log("balance of token1: " + await token1.balanceOf(wallet.address))
    console.log("balance of token2: " + await token2.balanceOf(wallet.address))

}