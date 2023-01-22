import { createServer } from 'http';
import app from 'express';
import { Socket } from 'socket.io';
import { Whatsapp } from './services/whatsapp.service';

const http = createServer(app);
const whatsapp = new Whatsapp();

const socketIO = require('socket.io')(http, {
  cors: { origin: "http://localhost:3001" }
});

socketIO.on('connection', (socket: Socket) => {
  socket.on('start', async (data) => {
    console.log(`⚡: ${data.socketId} user just connected!`);
    if(data.newConnection) {
      if(!data.socketId) {
        return;
      }
      
      const client = await whatsapp.newConnection(`${data?.socketId}`, socket)
      const msgs = await whatsapp.getMessages(client)
      socket.emit('chats', msgs)
    }
  })

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});

http.listen(3000, () => {
  console.log("Listening on port 3000");
})