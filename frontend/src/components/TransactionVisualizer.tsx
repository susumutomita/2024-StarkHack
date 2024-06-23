import React, { useEffect, useState } from 'react';
import { socketService } from '../services/socket';
import html2canvas from 'html2canvas';

interface Transaction {
  blockNumber: number;
  contractAddress: string;
  hash: string;
  senderAddress: string;
  actualFee: string;
}

const MAX_TRANSACTIONS = 400; // 行数を増やす

const TransactionVisualizer: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    socketService.on('new_transaction', (data: { txData: Transaction }) => {
      console.log('New transaction received:', data.txData);
      setTransactions(prevTransactions => {
        const newTransactions = [data.txData, ...prevTransactions.slice(0, MAX_TRANSACTIONS - 1)];
        return newTransactions;
      });
    });
  }, []);

  const takeSnapshot = () => {
    html2canvas(document.getElementById('snapshot-container')!).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      // ここでNFTとして保存する処理を実装
      console.log(imgData);
    });
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.header}>
        <h1 style={styles.title}>Blockchain Pulse</h1>
        <p style={styles.description}>An interactive and dynamic digital art installation visualizing real-time blockchain transaction data.</p>
      </div>
      <div id="snapshot-container" style={styles.container}>
        {transactions.map((transaction, index) => (
          <div key={index} style={styles.transaction}>
            <span>{transaction.blockNumber}-</span>
            <span>{transaction.contractAddress}-</span>
            <span>{transaction.hash}-</span>
            <span>{transaction.senderAddress}-</span>
            <span>{transaction.actualFee}</span>
          </div>
        ))}
      </div>
      <div style={styles.controlPanel}>
        <button onClick={takeSnapshot} style={styles.button}>Take Snapshot</button>
      </div>
    </div>
  );
};

const styles = {
  outerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'red',
    height: '100vh', // 画面全体をカバー
    overflow: 'hidden', // スクロールバーを隠す
  } as React.CSSProperties,
  header: {
    textAlign: 'center',
    color: 'white',
    marginBottom: '10px', // 上部と下部のマージンを減らす
    padding: 0,
  } as React.CSSProperties,
  title: {
    margin: 0,
    padding: 0,
    fontSize: '24px',
  } as React.CSSProperties,
  description: {
    margin: '5px 0',
    fontSize: '14px',
  } as React.CSSProperties,
  container: {
    backgroundColor: 'black',
    color: 'red',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
    fontFamily: 'monospace', // モノスペースフォントを使用
    width: '100%',
    height: '80vh', // コンテナの高さを増やす
    paddingTop: '20px', // トップのパディングを追加してテキストとスペースを分ける
  } as React.CSSProperties,
  transaction: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: '12px', // フォントサイズを適切に調整
    lineHeight: '12px', // 行の高さを調整
    whiteSpace: 'nowrap',
  } as React.CSSProperties,
  controlPanel: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '5px',
    borderRadius: '5px',
  } as React.CSSProperties,
  button: {
    padding: '10px',
    backgroundColor: 'white',
    border: 'none',
    cursor: 'pointer',
  } as React.CSSProperties,
};

export default TransactionVisualizer;
