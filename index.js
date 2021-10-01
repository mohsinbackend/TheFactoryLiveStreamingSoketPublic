var express = require("express");
var app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});




const NodeMediaServer = require('node-media-server')

const port = process.env.PORT || 1935;
const httpPort = process.env.PORT || 8000;

const config = {
  rtmp: {
    port: port,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: httpPort,
    allow_origin: '*',
  },
  auth: {
    api : true,
    api_user: 'admin',
    api_pass: '12345678',
  }
}


var nms = new NodeMediaServer(config)
nms.run()

console.log("*************** SOKET.IO SERVER START PORT 3000 *************");
const server = app.listen(process.env.PORT || '3000')

let io = require("./socket/main").init(server)

io.on('connection', (socket) => {

  console.log('connected live stream device');

  socket.on('disconnect live stream device', () => {
    console.log('user disconnected');
  });


  socket.on('join_live_stream_name', (name) => {
    console.log('join_live_stream_name: ' + name);
    io.emit('join_live_stream_name', name);
  });




});


io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

io.on('connection', (socket) => {
  socket.broadcast.emit('hi');
});



// io.on("connection", function(socket) {

//   console.log('socket',socket.id);
//   io=socket
//   socket.on('typing', ({typing,cId,uId}) => {
//     socket.broadcast.emit(`checkTyping`,{typing,cId,uId});
//  });


// })


