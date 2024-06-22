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

let lastSeenTransactionHash = '';

async function pollTransactions() {
  try {
    const latestOpcodes = await opcodeService.getLatestTransactionOpcodes();
    for (const { txHash, opcodes } of latestOpcodes) {
      if (txHash !== lastSeenTransactionHash) {
        io.emit('new_opcode', { txHash, opcodes });
        lastSeenTransactionHash = txHash;
      }
    }
  } catch (error) {
    console.error('Failed to fetch latest opcodes', error);
  }
}

io.on('connection', (socket: any) => {
  console.log('a user connected');

  // クライアントが接続したときの初期データ送信
  socket.emit('connected', { message: 'You are connected to the server' });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// 5秒ごとにトランザクションをポーリング
setInterval(pollTransactions, 5000);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
