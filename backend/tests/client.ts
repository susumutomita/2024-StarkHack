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

function generateArt(txData) {
  const { hash, senderAddress, contractAddress, timestamp } = txData;
  // トランザクションデータを使用してアートを生成
  console.log(`Generating art for transaction ${hash}`);

  // 例: ハッシュを使用して色を生成
  const color = `#${hash.slice(-6)}`;
  console.log(`Color: ${color}`);

  // 例: タイムスタンプを使用してアニメーション速度を設定
  const speed = timestamp % 100;
  console.log(`Speed: ${speed}`);

  // 例: 送信者アドレスを使用して形状を生成
  const shape = senderAddress ? (parseInt(senderAddress.slice(-3), 16) % 2 === 0 ? 'circle' : 'square') : 'unknown';
  console.log(`Shape: ${shape}`);

  // クライアントサイドで視覚的に表示する
  displayArt(color, speed, shape);
}

function displayArt(color: any, speed: any, shape: any) {
  // アート表示のロジックをここに追加
  const artElement = document.createElement('div');
  artElement.style.width = '100px';
  artElement.style.height = '100px';
  artElement.style.backgroundColor = color;
  artElement.style.borderRadius = shape === 'circle' ? '50%' : '0';
  artElement.style.transition = `all ${speed}s`;

  document.body.appendChild(artElement);

  // 簡単なアニメーションを追加
  setTimeout(() => {
    artElement.style.transform = 'scale(1.5)';
  }, 1000);

  setTimeout(() => {
    artElement.style.transform = 'scale(1)';
  }, 2000);
}
