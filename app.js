const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const port = process.env.PORT || 3000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// DB Config
const db = require('./config/keys').mongoURI;

//connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//body parser middleware
app.use(bodyParser.json());

const server = http.createServer(app);



//socket configuration
const io = socketIO(server);

io.serveClient('origins', '*:*');
io.on('connection', socket => {
    console.log('Now client connected');

    socket.on('disconnect', () => {
        console.log('Now client disconnected')
    })
})

app.use(function(req,res,next){
    req.io = io;
    next();
});

//route files
let doc = require('./routes/doc');
app.use('/doc', doc);

app.get('/', (req, res) => res.send({message: 'Hello World!'}));
app.all('*', (req, res) => res.status(404).send({message:"Nothing is here"}));

server.listen(port, () => console.log(`Example app listening on port ${port}!`))