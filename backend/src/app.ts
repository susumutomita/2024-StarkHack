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

io.on('connection', (socket: any) => {
  console.log('a user connected');

  // クライアントからリアルタイムトランザクションを取得するリクエストを受け取る
  socket.on('fetch_latest_opcodes', async () => {
    try {
      const latestOpcodes = await opcodeService.getLatestTransactionOpcodes();
      socket.emit('latest_opcodes', latestOpcodes);
    } catch (error) {
      socket.emit('error', { message: 'Failed to fetch latest opcodes' });
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
