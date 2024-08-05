// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract DeVote {
    struct CandidateVotes {
        string candidate;
        uint256 votes;
    }

    struct StateVotes {
        mapping(uint8 => uint256) votesPerCandidate;
    }

    struct StateResult {
        string state;
        CandidateVotes[] votes;
    }

    string[] public candidates;
    mapping(string => uint8) private candidateIndices;

    string[] public states;
    mapping(string => StateVotes) private stateVotes;

    mapping(string => bool) private hasVoted;

    constructor(string[] memory candidateNames, string[] memory stateList) {
        candidates = candidateNames;
        for (uint8 i = 0; i < candidateNames.length; i++) {
            candidateIndices[candidateNames[i]] = i;
        }
        states = stateList;

        for (uint8 j = 0; j < stateList.length; j++) {
            for (uint8 i = 0; i < candidateNames.length; i++) {
                stateVotes[stateList[j]].votesPerCandidate[i] = 0;
            }
        }
    }

    function vote(string memory userId, string memory candidateName, string memory state) public {
        require(hasVoted[userId], "You have already voted.");
        require(candidateIndices[candidateName] < candidates.length, "Invalid candidate name.");

        uint8 candidateIndex = candidateIndices[candidateName];

        hasVoted[userId] = true;
        stateVotes[state].votesPerCandidate[candidateIndex] += 1;
    }

    function getVotes() public view returns (StateResult[] memory) {
        StateResult[] memory results = new StateResult[](states.length);

        for (uint8 i = 0; i < states.length; i++) {
            string memory state = states[i];
            results[i].state = state;
            results[i].votes = new CandidateVotes[](candidates.length);
            for (uint8 j = 0; j < candidates.length; j++) {
                results[i].votes[j].candidate = candidates[j];
                results[i].votes[j].votes = stateVotes[state].votesPerCandidate[j];
            }
        }

        return results;
    }

    function getCandidates() public view returns (string[] memory) {
        return candidates;
    }

    function getStateList() public view returns (string[] memory) {
        return states;
    }
}
