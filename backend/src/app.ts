import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/', router);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // Add your event listeners here to send real-time data to the client
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
