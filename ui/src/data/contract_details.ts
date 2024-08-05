export const contractAddress = "0x049f26cBADe6b9b3D40734CDe98108407cc9A088";
export const RPC_URL = "https://sepolia.optimism.io";
export const abi = [
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "candidateNames",
        "type": "string[]"
      },
      {
        "internalType": "string[]",
        "name": "stateList",
        "type": "string[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "candidates",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCandidates",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getStateList",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getVotes",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "state",
            "type": "string"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "candidate",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "votes",
                "type": "uint256"
              }
            ],
            "internalType": "struct DeVote.CandidateVotes[]",
            "name": "votes",
            "type": "tuple[]"
          }
        ],
        "internalType": "struct DeVote.StateResult[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "states",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "userId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "candidateName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "state",
        "type": "string"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
