import express from 'express';
import { Server } from 'socket.io';
import path from 'path'; // needed for serving static files.

const PORT = process.env.PORT || 3000;

// Server initialization with Express, https://socket.io/docs/v4/server-initialization/#with-express

// create a new Express server instance.
const app = express();

// serve static files from the 'public' directory.
// 'process.cwd()' to return the current working directory of the Node.js process.
app.use(express.static(path.join(process.cwd(), 'public')));

// middleware to parse and handle URL-encoded data submitted through HTML forms.
app.use(express.urlencoded({ extended: true }));

// start the Express server and listen for incoming connections on PORT.
const expressServer = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// create a new Socket.io server instance and binds it to the Express server.
// CORS is not required, as the Express server is serving the HTML content and the static files.
const io = new Server(expressServer, {
  /* options */
});

// event handler that is triggered whenever a new client establishes a WebSocket connection with the Socket.io server.
io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected!`);

  // message event
  socket.on('message', (data) => {
    console.log(`Received message: ${data}`);

    // send a message to all clients, include sender.
    io.emit('message', `${socket.id.substring(0, 5)}: ${data}`);

    // send a message only to sender.
    socket.emit('message', `You: ${data}`);
  });

  // event handler for 'disconnect' event (either client or server-side).
  socket.on('disconnect', (reason) => {
    console.log(`User ${socket.id} disconnected! ${reason}`);
  });
});
