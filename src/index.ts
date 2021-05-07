import express from 'express';
import socketio from 'socket.io';
import path from 'path';
import http from 'http';

const app = express();
const httpServer = http.createServer(app);
const io = new socketio.Server(httpServer);

app.use(express.static(path.resolve(__dirname, '..', 'public')));

io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);

    socket.on('message', message => {
        io.emit('connections', `Users Connected: ${io.engine.clientsCount} ${new Date()}`)
        socket.emit('received', `Received ${message}`);
    });
})


httpServer.listen(3333);