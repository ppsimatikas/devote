import {verifyCloudProof} from "@worldcoin/idkit-core/backend";
import {ISuccessResult} from "@worldcoin/idkit-core";

export const verify = async (proof: ISuccessResult) => {
  // Get those here: https://developer.worldcoin.org/
  const appId = "app_7277b5b984d95e288e9cabbb4390be35";
  const action = "devote";
  const verifyRes = await verifyCloudProof(proof, appId, action);

  if (verifyRes.success) {
    return null;
  } else {
    return verifyRes.code;
  }
};
