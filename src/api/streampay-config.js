// Define Solana networks
const solanaNetworks = {
    mainnet: {
        rpcUrl: 'https://api.mainnet-beta.solana.com',
        tokenProgramId: 'YOUR_MAINNET_TOKEN_PROGRAM_ID',
        // Add other Mainnet-specific configurations
    },
    devnet: {
        rpcUrl: 'https://api.devnet.solana.com',
        tokenProgramId: 'YOUR_DEVNET_TOKEN_PROGRAM_ID',
        // Add other Devnet-specific configurations
    },
};

// Function to set the current network
function setCurrentNetwork(network) {
    if (solanaNetworks[network]) {
        return solanaNetworks[network];
    } else {
        console.error(`Invalid network specified: ${network}`);
        process.exit(1); // Exit the process in case of an invalid network
    }
}

// Specify the current network here (mainnet or devnet)
const currentNetwork = process.env.SOLANA_NETWORK || 'mainnet'; // Default to mainnet

// Get the configuration for the selected network
const selectedNetworkConfig = setCurrentNetwork(currentNetwork);

module.exports = selectedNetworkConfig;