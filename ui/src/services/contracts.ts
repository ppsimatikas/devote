import {ethers} from "ethers";
import {abi, contractAddress, RPC_URL} from "../data/contract_details";


function getContract() {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    return new ethers.Contract(contractAddress, abi, provider);
}

export async function getCandidates(): Promise<string[]> {
    return await getContract().getCandidates()
}

export function getVotes(): Promise<any[]> {
    return getContract().getVotes()
}