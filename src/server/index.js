const Server = require('socket.io'),
      Chat   = require('./factory/Chat'),
      e      = require('./events');

const io = new Server(5000);

// Event listeners
io.on(e.CONNECTION, (socket) => {
  socket.on(e.JOIN_USER, (userName, roomId) => {
    const { user, room, color } = chat.join(userName, roomId);

    socket.room = room;
    socket.user = user;
    socket.color = color;
    socket.join(user.room);

    io.to(user.room).emit(e.USER_JOINED, {
      user: {
        id: user.id,
        name: user.name,
        color,
        room: user.room
      },
      users: room.users
    })
  });

  socket.on(e.NEW_MESSAGE, (message) => {
    const { user, room, body } = message;
    const { color } = socket;
    io.to(room).emit(e.MESSAGE_RECEIVED, {
      user: {
        id: user.id,
        name: user.name
      },
      body,
      color,
      timestamp: new Date().getTime()
    });
  });

  socket.on(e.START_TYPING, () => {
    if (!socket.user) return;

    const { name, id, room } = socket.user;
    const { color } = socket;

    io.to(room).emit(e.START_TYPING, { name, id, color });
  });

  socket.on(e.STOP_TYPING, () => {
    const { user } = socket;
    if (!user) return;
    io.to(user.room).emit(e.STOP_TYPING, user.id);
  });

  // socket.on(e.RECONNECT, () => userJoined = false);

  socket.on(e.DISCONNECT, () => {
    const { user, color } = socket;
    if (!user) return;

    chat.leave(user.id, user.room, color);
    io.to(user.room).emit(e.USER_LEFT, {
      user: {
        name: user.name
      },
      color: socket.color,
      users: socket.room.users
    });
    io.to(user.room).emit(e.STOP_TYPING, user.id);
  });
});

const chat = new Chat();