import React, { useEffect, useState } from 'react';
import { socketService } from '../services/socket';

interface Transaction {
  id: string;
  type: string;
  value: number;
}

const TransactionVisualizer: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    socketService.on('new_opcode', (data: Transaction) => {
      console.log('New transaction received:', data); // 追加: 受信データのログ
      setTransactions(prevTransactions => [data, ...prevTransactions]);
    });
  }, []);

  return (
    <div>
      {transactions.map(transaction => (
        <div key={transaction.id} style={{
          backgroundColor: getColor(transaction.type),
          height: `${transaction.value}px`,
          width: '100%'
        }}>
          {transaction.type} - {transaction.value}
        </div>
      ))}
    </div>
  );
};

const getColor = (type: string) => {
  switch (type) {
    case 'type1': return 'red';
    case 'type2': return 'green';
    case 'type3': return 'blue';
    default: return 'gray';
  }
};

export default TransactionVisualizer;
