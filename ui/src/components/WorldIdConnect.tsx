import {IDKitWidget, ISuccessResult, VerificationLevel} from "@worldcoin/idkit";
import {Children, cloneElement} from "react";

export function WorldIdConnect({party, children, onSuccess}: { party: any, children: any, onSuccess: (c: any) => void }) {
    const handleVerify = async (proof: ISuccessResult) => {
        // TODO: verify on the backend
    };

    return (
        <IDKitWidget
            action_description="PANOS"
            app_id="app_316ab2b6aa45379bb293fd495d5158a7" // obtained from the Developer Portal
            action="devote" // obtained from the Developer Portal
            onSuccess={onSuccess} // callback when the modal is closed
            handleVerify={handleVerify} // callback when the proof is received
            verification_level={VerificationLevel.Orb}
        >
            {({open}) => Children.map(children, child =>
                cloneElement(child, {onClick: open})
            )}
        </IDKitWidget>
    )
}