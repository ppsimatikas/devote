import {useQuery} from '@tanstack/react-query';
import {getCandidates, getVotes} from "../services/contracts";
import {candidates} from "../data/candidates";
import states from "../data/states.json";

export function useCandidates() {
    return useQuery({
        queryKey: ['candidates'],
        queryFn: async () => {
            const candidatesOnContract = await getCandidates();
            return candidates.filter(
                (p) => candidatesOnContract.indexOf(p.title) !== -1
            );
        },
        staleTime: 3600000 * 24, // 24 hours
    })
}
function mockData() {
    return states.features.reduce((stateVotes, state: any) => {
        stateVotes[state.properties.state] = candidates.reduce((votes: any, party) => {
            votes[party.title] = Math.floor(Math.random() * 1000001)
            return votes;
        }, {})
        return stateVotes;
    }, {} as any)
}

function votesToData(votes: any[]) {
    return votes.reduce((stateVotes, state: any) => {
        console.log(state.state);
        stateVotes[state.state] = state.votes.reduce((votes: any, party: any) => {
            console.log(party.candidate, party.votes);
            votes[party.candidate] = Number(party.votes);
            return votes;
        }, {} as any);
        return stateVotes;
    }, {} as any);
}

export function useResults() {
    return useQuery({
        queryKey: ['results'],
        queryFn: async () => {
            const votes = await getVotes();
            return votesToData(votes);
        },
        staleTime: 360, // 1 minute
    })
}