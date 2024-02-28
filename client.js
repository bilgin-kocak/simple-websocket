const io = require('socket.io-client');

const socket = io('ws://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to the server');
});

socket.on('transferEvents', (data) => {
  console.log('Received transfer event:', data);
});

socket.on('disconnect', () => {
  console.log('Disconnected from the server');
});
