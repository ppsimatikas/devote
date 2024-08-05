/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import {verify} from "./worldId";
import {voteOnContract} from "./contract";


export const vote = onRequest({
  cors: [/devote\.world/, "devote.world"],
}, async (request, response) => {
  const {candidate, proof} = request.body;

  const verifyError = await verify(proof);

  if (verifyError) {
    response.status(401).send(verifyError);
    return;
  }

  voteOnContract(proof.nullifier_hash, candidate.title, "IL")
    .then(() => response.send({"message": "vote successful"}))
    .catch(() => response.status(401).send("unable to vote"));
});
