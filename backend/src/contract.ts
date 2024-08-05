import {ethers} from "ethers";
import {abi, contractAddress} from "./data/contract_details";

const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT);

export async function voteOnContract(user: string, candidate: string, state: string) {
  if (!process.env.MASTER_WALLET_PK) {
    throw Error("set the MASTER_WALLET_PK environment variable");
  }

  const wallet = new ethers.Wallet(process.env.MASTER_WALLET_PK!, provider);

  const contractWithSigner = new ethers.Contract(contractAddress, abi, wallet);

  const tx = await contractWithSigner.vote(user, candidate, state);
  return await tx.wait();
}
