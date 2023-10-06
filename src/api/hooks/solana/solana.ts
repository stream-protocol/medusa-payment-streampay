import { useQuery, useMutation } from 'react-query';
import { Connection, PublicKey, Transaction, SystemProgram, Keypair } from '@solana/web3.js';

const SOLANA_RPC_URL = 'https://api.mainnet.solana.com';

const connection = new Connection(SOLANA_RPC_URL);

// Hook to fetch the balance of a Solana address
export function useSolanaBalance(address: string) {
  return useQuery(['solanaBalance', address], async () => {
    const publicKey = new PublicKey(address);
    const balance = await connection.getBalance(publicKey);
    return balance;
  }, {
    onError: (error) => {
      console.error("Error fetching Solana balance:", error);
    }
  });
}

// Hook to send SOL from one address to another
export function useSendSol() {
  return useMutation(async ({ senderSecretKey, recipientAddress, amount }: { senderSecretKey: string; recipientAddress: string; amount: number }) => {
    const senderKeyPair = Keypair.fromSecretKey(new Uint8Array(JSON.parse(senderSecretKey)));
    const recipientPublicKey = new PublicKey(recipientAddress);
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: senderKeyPair.publicKey,
        toPubkey: recipientPublicKey,
        lamports: amount,
      })
    );
    const signature = await connection.sendTransaction(transaction, [senderKeyPair]);
    return signature;
  }, {
    onError: (error) => {
      console.error("Error sending SOL:", error);
    },
    onSuccess: () => {
      // Refetch balance or do other tasks after a successful transaction
    }
  });
}

// Add more hooks as needed for other Solana interactions
