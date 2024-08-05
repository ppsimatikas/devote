import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    optimismDevnet: {
      url: "https://sepolia.optimism.io"
    },
    optimism: {
      url: "https://mainnet.optimism.io"
    },
  }
};

export default config;
