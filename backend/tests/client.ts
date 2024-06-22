import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('new_transaction', (data) => {
  console.log('New transaction received:', data);
  generateArt(data.txData);
});

socket.on('error', (error) => {
  console.error('Error:', error);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

function generateArt(txData: any) {
  const { hash, from, to, value, timestamp } = txData;
  // トランザクションデータを使用してアートを生成
  console.log(`Generating art for transaction ${hash}`);
  // ここでアート生成ロジックを追加
  // 例: ハッシュを使用して色を生成
  const color = `#${hash.slice(-6)}`;
  console.log(`Color: ${color}`);
  // 例: タイムスタンプを使用してアニメーション速度を設定
  const speed = timestamp % 100;
  console.log(`Speed: ${speed}`);
  // 例: 送信者アドレスを使用して形状を生成
  const shape = from.slice(-3) % 2 === 0 ? 'circle' : 'square';
  console.log(`Shape: ${shape}`);
}
