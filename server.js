// source: https://scotch.io/tutorials/mean-app-with-angular-2-and-the-angular-cli

// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const api = require('./server/routes');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

app.use(express.static(path.join(__dirname, 'public'))); // for the katex fonts
app.use(express.static(path.join(__dirname, 'node_modules/opus-recorder/dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '8080';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Socket.io
 */
const io = require('socket.io')(server);
const speechApi = require('./server/speech-to-text')
io.on('connection', function(socket) {
  console.log('Client connected...');

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('join', function(data) {
    console.log(data);
    socket.emit('message', 'Hello from server');
  });

  socket.on('audio', function(blob) {
    console.log('got audio');
    speechApi.recognize(blob, function(response){
      socket.emit("text", response);
    });
  });
});

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
