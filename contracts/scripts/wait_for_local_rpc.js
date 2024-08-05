const HEALTHCHECK_URL = 'http://127.0.0.1:8545';
const INTERVAL_MS = 1000; // Check every 1 second

async function healthCheck() {
    try {
        const response = await fetch(HEALTHCHECK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: 1,
                method: "web3_clientVersion",
                params: []
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.result) {
            console.log("RPC node is alive. Terminating health check.");
            process.exit(0); // Terminate the script
        } else {
            console.error("Unexpected response:", data);
        }
    } catch (error) {
        console.error("RPC node is not responding:", error.message);
    }

    setTimeout(healthCheck, INTERVAL_MS); // Retry after the interval
}

healthCheck();
