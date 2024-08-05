import {ethers} from "ethers";
import {abi, contractAddress, RPC_URL} from "./data/contract_details";


export const voteOnContract = async (user: string, candidate: string, state: string) => {
  if (!process.env.MASTER_WALLET_PK) {
    throw Error("set the MASTER_WALLET_PK environment variable");
  }
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(process.env.MASTER_WALLET_PK, provider);

  const contractWithSigner = new ethers.Contract(contractAddress, abi, wallet);

  const tx = await contractWithSigner.vote(user, candidate, state);
  return await tx.wait();
};
