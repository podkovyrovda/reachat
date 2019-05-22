const Server = require('socket.io'),
      Chat   = require('./factory/Chat'),
      e      = require('./events');

const io = new Server(5000);

// Create event listeners
io.on(e.CONNECTION, (socket) => {
  let userJoined = false;

  socket.on(e.JOIN_USER, (userName, roomId) => {
    console.log(e.JOIN_USER);
    const { user, room } = chat.join(userName, roomId);
    socket.room = room;

    if (!userJoined) {
      socket.user = user;
      socket.join(user.room);
      userJoined = true;
    }

    io.to(user.room).emit(e.USER_JOINED, {
      user: {
        id: user.id,
        room: user.room
      },
      users: room.users
    })
  });

  socket.on(e.NEW_MESSAGE, (message) => {
    console.log(e.NEW_MESSAGE);
    io.to(message.room).emit(e.MESSAGE_RECEIVED, {
      user: {
        id: message.user.id,
        name: message.user.name
      },
      message: message.body,
      date: new Date()
    });
  });

  socket.on(e.TYPING, () => {
    const { user } = socket;
    io.to(user.room).emit(e.TYPING, user.id);
  });

  socket.on(e.STOP_TYPING, () => {
    const { user } = socket;
    io.to(user.room).emit(e.STOP_TYPING, user.id);
  });

  // socket.on(e.RECONNECT, () => userJoined = false);

  socket.on(e.DISCONNECT, () => {
    console.log(e.DISCONNECT);
    const { user } = socket;
    if (!user) return;

    chat.leave(user.id, user.room);
    socket.to(user.room).emit(e.USER_LEFT, {
      user: {
        name: user.name
      },
      users: socket.room.users
    });
  });
});

const chat = new Chat();