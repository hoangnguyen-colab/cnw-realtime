require('dotenv').config();
const cors = require('cors');
const body_parser = require('body-parser');
const app = require('express')();

app.use(cors());

const http = require('http').Server(app);
const io = require("socket.io")(http, {
    cors: true,
    origins: ["http://localhost:5000"],
});

app.use(body_parser.json());

io.on('connection', (socket) => {
    console.log('a user connected', socket.socketid);
    // socket.broadcast.emit('a user connected');

    socket.on('order-placed-client', (message, callback) => {
        socket.broadcast.emit('order-placed-admin', message);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
});

app.get('/', (req, res) => {
    res.send('hello world');
});

http.listen(process.env.PORT, () => {
    console.log(`listening on : ${process.env.PORT}`);
});