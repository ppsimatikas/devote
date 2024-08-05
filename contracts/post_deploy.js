const fs = require('fs');

const {abi} = require('./artifacts/contracts/DeVote.sol/DeVote.json');
const addresses = require('./ignition/deployments/chain-31337/deployed_addresses.json');

const uiFilePath = '../ui/src/data/contract_details.ts'
const beFilePath = '../backend/src/data/contract_details.ts'

const content =
`export const contractAddress = '${addresses['DeVoteModule#DeVote']}'
    
export const abi = ${JSON.stringify(abi)}
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