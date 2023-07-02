const { message } = require('statuses');

const io = require('socket.io')(3000, {cors: {origin: "*"}});
  const users = {};

io.sockets.on('connection', socket=> {
  socket.on('joint', name=> {
     users[socket.id]=name;
     
    socket.broadcast.emit('joint',name);
   
  });
  socket.on('send', message=> {
    socket.broadcast.emit('resived',{message:message , name: users[socket.id]});
   });

   socket.on('disconnect', data=> {
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id]
   });
});
