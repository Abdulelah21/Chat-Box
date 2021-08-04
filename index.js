const mongoose = require('mongoose');
const Msg = require('./models/messages');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const ejs = require('ejs');

app.set('view engine','ejs');

//The connection to database
const mongoDB = 'mongodb+srv://abdulelah:abdulelah1420@cluster0.3dfum.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';



mongoose.connect(mongoDB,{ useNewUrlParser: true,
  useUnifiedTopology: true }).then(()=>{
  console.log('Connected...:D...')
}).catch(err => console.log('ther is error here Connected...:<...',err))


const io = new Server(server);

app.get('/', (req, res) => {
  Msg.find({},function(err,msgs){
     res.render('index',{
       messageList:msgs
     })
  })
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