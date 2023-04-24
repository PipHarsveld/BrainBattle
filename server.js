import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import { router } from './router/router.js'; 

dotenv.config();

const app = express();
const port = process.env.PORT || 4242;
const __dirname = path.resolve();
const server = http.createServer(app);
const io = new Server(server);
const historySize = 50
let history = []

// Link the templating engine to the express app
app.set('view engine', 'hbs');
app.set('views', 'views');


app.use('/', router);
app.use(express.static(__dirname + '/static')); //Css, images en javascript
app.use('/', express.static(__dirname + '/'));

app.engine('hbs', handlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'index',
    partialsDir: __dirname + '/views/partials'
}));


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('history', history)

    socket.on('chat', (data) => {
        console.log(data);

        while (history.length > historySize) {
            history.shift()
        }
        history.push(data)

        io.sockets.emit("chat", data);
    });

    socket.on('typing', (inputName) => {
        console.log("Aan het typen");
        socket.broadcast.emit("typing", inputName);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
});


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

