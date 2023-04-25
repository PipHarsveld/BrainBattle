import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const port = process.env.PORT || 4242;
const __dirname = path.resolve();
const server = http.createServer(app);
const io = new Server(server);

// Link the templating engine to the express app
app.set('view engine', 'hbs');
app.set('views', 'views');


app.use(express.static(__dirname + '/static')); //Css, images en javascript
app.use('/', express.static(__dirname + '/'));

app.engine('hbs', handlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'index',
    partialsDir: __dirname + '/views/partials'
}));

app.get('/', (req, res) => {
    res.render('main', { layout: 'index' });
})

app.get("/room/:roomNumber", (req, res) => {
    const { roomNumber } = req.params;

    // Render the room page with the room number passed as a parameter
    res.render("room", { layout: "index", roomNumber });
});


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on("createRoom", () => {
        const roomNumber = generateRoomNumber();
        socket.join(roomNumber);
        console.log(`Room ${roomNumber} created`);

        // Add the room to the adapter rooms object
        // io.sockets.adapter.rooms.set(roomNumber, new Set());


        // const roomNumbers = Array.from(io.sockets.adapter.rooms.keys());
        // console.log(roomNumbers);

        socket.emit("roomCreated", roomNumber);
    });

    socket.on("joinRoom", ({ username, roomNumber }) => {
        console.log(io.sockets.adapter.rooms);
        // if (io.sockets.adapter.rooms.has(roomNumber)) {
            console.log(`User ${username} joined room ${roomNumber}`);
            socket.join(`${roomNumber}`);
            socket.emit("roomJoined", { roomNumber, username });
        // } else {
            // console.log(`Room ${roomNumber} does not exist`);
        // }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


const generateRoomNumber = () => {
    return Math.floor(Math.random() * 90000) + 10000;
};


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

