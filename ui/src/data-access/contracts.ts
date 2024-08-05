import {useQuery} from '@tanstack/react-query';
import {getCandidates} from "../services/contracts";
import {candidates} from "../data/candidates";

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