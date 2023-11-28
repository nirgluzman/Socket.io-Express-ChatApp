// https://socket.io/docs/v4/client-api/
import { io } from 'https://cdn.socket.io/4.7.2/socket.io.esm.min.js';

// establish a WebSocket connection from the client to a Socket.IO server.
const socket = io('ws://localhost:3000');

function sendMessage(e) {
  e.preventDefault(); // submit the form without reload the page.
  const input = document.querySelector('input');
  if (input.value) {
    socket.emit('message', input.value);
    input.value = '';
  }
  // set the focus back to input element without having to manually click on it.
  input.focus();
}

// add an event listener to a form element.
// the event listener triggers the sendMessage() function whenever the form is submitted.
document.querySelector('form').addEventListener('submit', sendMessage);

// add an event listener to a socket.io connection.
socket.on('connection', () => {
  console.log('Connected to the server!');
});

// add an event listener to incoming messages.
socket.on('message', (data) => {
  console.log(`Received message: ${data}`);
  const li = document.createElement('li');
  li.textContent = data;
  document.querySelector('ul').appendChild(li);
});
