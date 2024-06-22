import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ArtDisplay from './components/ArtDisplay';

const socket = io('http://localhost:3000');  // サーバー側のポートに接続

interface TransactionData {
  hash: string;
  senderAddress: string;
  contractAddress: string;
  timestamp: number;
}

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('new_transaction', (data: { txData: TransactionData }) => {
      console.log('New transaction received:', data);
      setTransactions((prev) => [...prev, data.txData]);
    });

    socket.on('error', (error: any) => {
      console.error('Error:', error);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.off('connect');
      socket.off('new_transaction');
      socket.off('error');
      socket.off('disconnect');
    };
  }, []);

  return (
    <div>
      <h1>Blockchain Art</h1>
      <div className="art-container">
        {transactions.map((tx) => (
          <ArtDisplay key={tx.hash} txData={tx} />
        ))}
      </div>
    </div>
  );
};

export default App;
