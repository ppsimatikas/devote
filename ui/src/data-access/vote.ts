import {post} from "../services/api";
import {ISuccessResult} from "@worldcoin/idkit";
import {Candidate} from "../data/candidates";

export async function vote(candidate: Candidate, proof: ISuccessResult) {
    const res = await post('vote', {}, {
        proof,
        candidate
    });
    if (!res.ok) {
        throw new Error("You have already voted. You can only vote once.");
    }
}