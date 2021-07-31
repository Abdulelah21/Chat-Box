const mongoose = require('mongoose');
const Msg = require('./models/messages');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");


//The connection to database
const mongoDB = 'mongodb+srv://abdulelah:abdulelah1420@cluster0.3dfum.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(mongoDB,{ useNewUrlParser: true,
  useUnifiedTopology: true }).then(()=>{
  console.log('Connected...')
}).catch(err => console.log(err))



const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});



io.on('connection', (socket) => {
    Msg.find().then(result=>{
      socket.emit('output-messages',result)
    })

    socket.on('chat message', (msg) => {
      const message = new Msg({msg})
      
      message.save().then(()=>{
        io.emit('chat message', msg);
      })
      
    });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});