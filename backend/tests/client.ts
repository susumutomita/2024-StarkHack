import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to server');

  // リアルタイムトランザクションのオペコードを取得するリクエストを送信
  socket.emit('fetch_latest_opcodes');
});

socket.on('latest_opcodes', (data) => {
  console.log('Latest opcodes:', data);
  // ここでアート生成の処理を追加
});

socket.on('error', (error) => {
  console.error('Error:', error);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
