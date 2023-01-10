const Whatsapp = require('./Services/whatsappService');

const app = require('express')();
const http = require('http').createServer(app);

const socketIO = require('socket.io')(http, {
  cors: { origin: "http://localhost:3001" }
});

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('start', (data) => {
    console.log("START", data);
    if(data.newConnection) {
      Whatsapp.newConnection(`connection-${socket.id}`, socket);
    }
  })

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});

http.listen(3000, () => {
  console.log("Listening on port 3000");
})