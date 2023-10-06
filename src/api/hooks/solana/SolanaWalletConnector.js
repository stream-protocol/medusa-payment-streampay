import React from 'react';
import {
    WalletModalProvider,
    WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import {
    WalletProvider,
    ConnectionProvider,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    getPhantomWallet,
    getSolletWallet,
    // ... import other wallets you want to support
} from '@solana/wallet-adapter-wallets';

// Define the network to use (mainnet, devnet, etc.)
const network = WalletAdapterNetwork.Devnet;

// Define supported wallets
const wallets = [
    getPhantomWallet(),
    getSolletWallet(),
    // ... add other wallets you want to support
];

const SolanaWalletConnector = () => {
    return ( <
        ConnectionProvider endpoint = { `https://api.${network}.solana.com` } >
        <
        WalletProvider wallets = { wallets }
        onError = {
            (error) => console.error(error) } >
        <
        WalletModalProvider >
        <
        WalletMultiButton className = "custom-class" / >
        <
        /WalletModalProvider> <
        /WalletProvider> <
        /ConnectionProvider>
    );
};

export default SolanaWalletConnector;