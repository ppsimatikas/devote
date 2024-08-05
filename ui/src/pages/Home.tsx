import {Stack} from "@mantine/core";
import {useEffect, useState} from "react";
import {ethers} from "ethers";


function Home() {
    const [ message, setMessage ] = useState<string>('');

    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    const contractABI = [
        "function message() public view returns (string)"
    ];
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");

    useEffect(() => {
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        contract.message().then(setMessage);
    }, []);

    return (
        <Stack>
            <h1>Vote for the 2024 U.S. elections</h1>
            <b>{message}</b>
        </Stack>
    );
}

export default Home;
