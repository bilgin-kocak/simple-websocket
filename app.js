const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server); // Bind socket.io to our server

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // Example: listen for a custom event (Not really needed in this case, but just to show how to do it)
  // This is for the client send a message to the server
  socket.on('transferEvents', (msg) => {
    console.log('message: ' + msg);
  });
});

// POST endpoint to trigger an event to transferEvents subscribers
app.post('/webhook', (req, res) => {
  // Save the event to the mongodb

  // Emit the event to the subscribers
  const dummyMoralisEvent = {
    transaction: {
      hash: '0x1234567890',
      from_address: '0x1234567890',
      to_address: '0x1234567890',
      value: '1234567890',
      block_number: '1234567890',
      block_hash: '0x1234567890',
      transaction_index: '1234567890',
      confirmations: '1234567890',
      is_error: '1234567890',
      timestamp: '1234567890',
    },
    logs: [
      {
        address: '0x1234567890',
        data: '0x1234567890',
        topics: ['0x1234567890', '0x1234567890'],
        block_number: '1234567890',
        transaction_hash: '0x1234567890',
        transaction_index: '1234567890',
        log_index: '1234567890',
        block_hash: '0x1234567890',
        removed: '1234567890',
      },
    ],
  };
  io.emit('transferEvents', dummyMoralisEvent);
  res.send('Message emitted');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
