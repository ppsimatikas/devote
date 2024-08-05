/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {ethers} from "ethers";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractABI = [
  "function message() public view returns (string)",
  "function setMessage(string memory _message) public",
];

function getProvider() {
  return new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT);
}

async function getBalance(wallet: ethers.Wallet) {
  return ethers.formatEther(await getProvider().getBalance(wallet.address));
}

async function setMessage(wallet: ethers.Wallet, newMessage: string) {
  const contractWithSigner = new ethers.Contract(
    contractAddress, contractABI, wallet
  );

  const tx = await contractWithSigner.setMessage(newMessage);
  await tx.wait();

  logger.info("New message set: " + newMessage, {structuredData: true});
}

export const helloWorld = onRequest(async (request, response) => {
  if (!process.env.MASTER_WALLET_PK) {
    response.status(500).send({
      "error": "set the MASTER_WALLET_PK environment variable",
    });
    return;
  }

  const provider = getProvider();
  const wallet = new ethers.Wallet(process.env.MASTER_WALLET_PK, provider);

  logger.info("Hello logs!", {structuredData: true});
  logger.info(await getBalance(wallet), {structuredData: true});
  await setMessage(wallet, "Hello panos");
  logger.info(await getBalance(wallet), {structuredData: true});
  response.send(wallet.privateKey);
});
