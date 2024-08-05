import {verifyCloudProof} from "@worldcoin/idkit-core/backend";

export async function verify(proof: any) {
  // Get those here: https://developer.worldcoin.org/
  const appId = "app_7277b5b984d95e288e9cabbb4390be35";
  const action = "devote";
  const verifyRes = await verifyCloudProof(proof, appId, action);

  if (verifyRes.success) {
    return null;
  } else {
    return verifyRes.code;
  }
}
