import {IDKitWidget, ISuccessResult, VerificationLevel} from "@worldcoin/idkit";
import {Children, cloneElement} from "react";
import {Candidate} from "../data/candidates";
import {vote} from "../data-access/vote";
import {toastError} from "./ui-toast";

export function WorldIdConnect({candidate, children, onSuccess}: { candidate: Candidate, children: any, onSuccess: (c: any) => void }) {
    const handleVerify = async (proof: ISuccessResult) => {
        return vote(candidate, proof)
    };

    return (
        <IDKitWidget
            // Get those here: https://developer.worldcoin.org/
            action_description="devote"
            app_id="app_7277b5b984d95e288e9cabbb4390be35" // obtained from the Developer Portal
            action="devote" // obtained from the Developer Portal
            onSuccess={onSuccess} // callback when the modal is closed
            handleVerify={handleVerify} // callback when the proof is received
            onError={(e) => toastError(e?.message ?? 'An error occurred, please try again later.')}
            verification_level={VerificationLevel.Orb}
        >
            {({open}) => Children.map(children, child =>
                cloneElement(child, {onClick: open})
            )}
        </IDKitWidget>
    )
}