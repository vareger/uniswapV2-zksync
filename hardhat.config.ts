import '@matterlabs/hardhat-zksync-deploy';
import '@matterlabs/hardhat-zksync-solc';
import 'hardhat-abi-exporter';

import { infuraApiKey, privateKey, mnemonic, etherscanApiKey, bscnode } from "./network_keys/secrets.json";

module.exports = {
  zksolc: {
    version: '1.3.8',
    compilerSource: 'binary',
    settings: {
      optimizer: {
        enabled: true,
      }
    },
  },
  zkSyncDeploy: {
    zkSyncNetwork: 'https://zksync2-testnet.zksync.dev',
    ethNetwork: 'goerli'
  },


  networks: {
    mainnet:{
      url: "https://mainnet.infura.io/v3/"+infuraApiKey // The Ethereum Web3 RPC URL (optional).
    },
    goerli: {
      url: "https://goerli.infura.io/v3/"+infuraApiKey // The Ethereum Web3 RPC URL (optional).
    },
    zkSyncTestnet: {
      url: "https://testnet.era.zksync.dev", // The testnet RPC URL of zkSync Era network.
      ethNetwork: "goerli", // The Ethereum Web3 RPC URL, or the identifier of the network (e.g. `mainnet` or `goerli`)
      zksync: true
    },
    zkSyncMainnet: {
      url: "https://mainnet.era.zksync.io", // The testnet RPC URL of zkSync Era network.
      ethNetwork: "mainnet", // The Ethereum Web3 RPC URL, or the identifier of the network (e.g. `mainnet` or `goerli`)
      zksync: true
    }
  },
  solidity: {
    version: '0.8.19',
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true
      }
    }
  },
};