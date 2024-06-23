import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { OpcodeService } from './services/OpcodeService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';
const apiBaseURL = isProduction ? 'https://api.voyager.online/beta' : 'https://sepolia-api.voyager.online/beta';
const opcodeService = new OpcodeService(apiBaseURL);

app.use(express.json());
app.use('/', router);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  }
});

let lastSeenTransactionTimestamp = 0;

// トランザクションをポーリングする関数
async function pollTransactions() {
  console.log('Polling transactions...');
  try {
    const latestTransactions = await opcodeService.getLatestTransactionOpcodes();
    for (const { txHash, opcodes } of latestTransactions) {
      const txData = await opcodeService.getTransactionData(txHash);
      console.log(`Fetched txData: ${JSON.stringify(txData)}`);
      console.log(`Current txData.timestamp: ${txData.timestamp}, lastSeenTransactionTimestamp: ${lastSeenTransactionTimestamp}`);

      // タイムスタンプが新しいトランザクションのみを送信
      // if (txData.timestamp > lastSeenTransactionTimestamp) {
      console.log('Emitting new_transaction event with data:', txData);
      io.emit('new_transaction', { txData });
      lastSeenTransactionTimestamp = txData.timestamp;
      // }
    }
  } catch (error) {
    console.error('Failed to fetch latest transactions', error);
  }
}

io.on('connection', (socket: any) => {
  console.log('A user connected');

  // クライアントが接続したときの初期データ送信
  socket.emit('connected', { message: 'You are connected to the server' });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// 3秒ごとにトランザクションをポーリング
setInterval(pollTransactions, 3000);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
