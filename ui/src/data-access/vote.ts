import {post} from "../services/api";
import {ISuccessResult} from "@worldcoin/idkit";
import {Candidate} from "../data/candidates";
import states from "../data/states.json";
import {getRandomItem} from "../utils/list";

export async function vote(candidate: Candidate, proof: ISuccessResult) {
    const state = getRandomItem(states.features).properties.state;
    const res = await post('vote', {}, {
        proof,
        candidate,
        state
    });
    if (!res.ok) {
        throw new Error("You have already voted.");
    }
}