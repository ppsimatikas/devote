import {Stack} from "@mantine/core";
import {useEffect, useState} from "react";
import {ethers} from "ethers";
import {abi, contractAddress} from "../data/contract_details";


function Home() {
    const [ message, setMessage ] = useState<any>(null);

    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");

    useEffect(() => {
        const contract = new ethers.Contract(contractAddress, abi, provider);
        contract.getVotes().then(setMessage);
    }, []);

    if (message) {
        console.log(message[0].state);
        console.log(message[0].votes[0].candidate);
        console.log(message[0].votes[0].votes);

    }

    return (
        <Stack>
            <h1>Vote for the 2024 U.S. elections</h1>
            <b>{message}</b>
        </Stack>
    );
}

export default Home;
