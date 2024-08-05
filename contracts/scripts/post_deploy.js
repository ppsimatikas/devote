const fs = require('fs');

const {abi} = require('../artifacts/contracts/DeVote.sol/DeVote.json');

const chainId = process.argv[2];

const RPCS = {
    '31337': 'http://127.0.0.1:8545',
    '11155420': 'https://sepolia.optimism.io',
}

const addresses = require(`../ignition/deployments/chain-${chainId}/deployed_addresses.json`);

const uiFilePath = '../ui/src/data/contract_details.ts'
const beFilePath = '../backend/src/data/contract_details.ts'

const content =
`export const contractAddress = "${addresses['DeVoteModule#DeVote']}";
export const RPC_URL = "${RPCS[chainId]}";
export const abi = ${JSON.stringify(abi, null, 2)};
`

function write_to_file(filePath) {
    fs.writeFile(filePath, content, 'utf8', (err) => {
        if (err) {
            console.error(`An error occurred while writing ${filePath}`, err);
            return;
        }
        console.log(`${filePath} has been written successfully.`);
    });
}

write_to_file(uiFilePath)
write_to_file(beFilePath)