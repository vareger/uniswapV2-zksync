import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
import * as dotenv from "dotenv";
dotenv.config();
import "@matterlabs/hardhat-zksync-verify";

const {
  MNEMONIC
} = process.env


module.exports = {
  env: {
    MNEMONIC: MNEMONIC
  },
  zksolc: {
    version: "1.3.5",
    compilerSource: "binary",
    settings: {},
  },
  defaultNetwork: "zkSyncTestnet",

  networks: {
    zkSyncTestnet: {
      url: "https://zksync2-testnet.zksync.dev",
      ethNetwork: "goerli", // Can also be the RPC URL of the network (e.g. `https://goerli.infura.io/v3/<API_KEY>`)
      zksync: true,
      verifyURL: 'https://zksync2-testnet-explorer.zksync.dev/contract_verification'
    },
    zkSyncLocal: {
      url: "http://localhost:3050",
      ethNetwork: "http://localhost:8545",
      zksync: true
    }
  },
  etherscan: {
    apiKey: ""
  },
  solidity: {
    compilers: [
      { 
        version: "0.8.16", 
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ]
  },
};

// import '@matterlabs/hardhat-zksync-solc';
// import "@matterlabs/hardhat-zksync-verify";

// export default {
//     zksolc: {
//         version: '1.3.5',
//         compilerSource: 'binary',
//         settings: {
//             isSystem: true
//         }
//     },
//     defaultNetwork: "zkTestnet",
//     networks: {
//         goerli: {
//             url: "https://goerli.infura.io/v3/<API_KEY>" // URL of the Ethereum Web3 RPC (optional)
//         },
//         zkTestnet: {
//             url: "https://zksync2-testnet.zksync.dev", // URL of the zkSync network RPC
//             ethNetwork: "goerli", // URL of the Ethereum Web3 RPC, or the identifier of the network (e.g. `mainnet` or `goerli`)
//             zksync: true,
//             // Verification endpoint for Goerli
//             verifyURL: 'https://zksync2-testnet-explorer.zksync.dev/contract_verification'
//         },
//     },
//     solidity: {
//         version: '0.8.16'
//     }
// };