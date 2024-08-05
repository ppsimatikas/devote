/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import {ethers} from "ethers";
import {abi, contractAddress} from "./data/contract_details";

const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT);

export const helloWorld = onRequest(async (request, response) => {
  if (!process.env.MASTER_WALLET_PK) {
    response.status(500).send({
      "error": "set the MASTER_WALLET_PK environment variable",
    });
    return;
  }

  const contract = new ethers.Contract(contractAddress, abi, provider);

  response.send(await contract.getCandidates());
});
