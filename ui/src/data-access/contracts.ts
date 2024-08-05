import {useQuery} from '@tanstack/react-query';
import {getCandidates} from "../services/contracts";
import {parties} from "../data/parties";

export function useCandidates() {
    return useQuery({
        queryKey: ['candidates'],
        queryFn: async () => {
            const candidatesOnContract = await getCandidates();
            return parties.filter(
                (p) => candidatesOnContract.indexOf(p.title) !== -1
            );
        },
        staleTime: 3600000 * 24, // 24 hours
    })
}