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
        const addState = Math.floor(Math.random() * 2);
        stateVotes[state.properties.state] = candidates.reduce((votes: any, party) => {
            votes[party.title] = addState ? Math.floor(Math.random() * 1000001) : 0;
            return votes;
        }, {})
        return stateVotes;
    }, {} as any)
}

function votesToData(votes: any[]) {
    return votes.reduce((stateVotes, state: any) => {
        const hasData = state.votes.find((p: any) => Number(p.votes) > 0)

        if (hasData) {
            stateVotes[state.state] = state.votes.reduce((votes: any, party: any) => {
                votes[party.candidate] = Number(party.votes);
                return votes;
            }, {} as any);
        }

        return stateVotes;
    }, {} as any);
}

export function useResults() {
    return useQuery({
        queryKey: ['results'],
        queryFn: async () => {
            const votes = await getVotes();
            const onchainVotes = votesToData(votes);
            const mocks = mockData();
            return {...mocks, ...onchainVotes};
        },
        staleTime: 360, // 1 minute
    })
}