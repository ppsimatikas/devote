import {ethers} from "ethers";
import {abi, contractAddress} from "../data/contract_details";

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");

function getContract() {
    return new ethers.Contract(contractAddress, abi, provider);
}

export function getCandidates(): Promise<string[]> {
    return getContract().getCandidates()
}