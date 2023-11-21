
const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(express.static(join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});
io.on('connection', (socket) => {

    socket.on('pseudo', (pseudo) => {
        socket.pseudo = pseudo;
        io.emit('chat message', `${pseudo} a rejoint le chat !`);
    });

    socket.on("color", (color) => {
        socket.color = color;
    });

    socket.on('chat message', (msg, color) => {
        io.emit('chat message', `${socket.pseudo} -  ${msg}`, socket.color);
    });


});
server.listen(8000, () => {
    console.log('server running at http://localhost:8000');
});