import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    optimismDevnet: {
      url: "https://sepolia.optimism.io",
      accounts: [`0x${process.env.OPTIMISM_SEPOLIA_PRIVATE_KEY}`],
    },
  }
};

export default config;
