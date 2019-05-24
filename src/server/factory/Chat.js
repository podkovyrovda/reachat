const User    = require('./User'),
      Room    = require('./Room');

module.exports = class Chat {
  constructor() {
    this._users = [];
    this._rooms = [];
  }

  createUser(name) {
    const user = new User(name);
    this.users.push(user);
    return user;
  }

  createRoom(id) {
    const i = this.rooms.findIndex(r => r.id === id);

    if (i >= 0) return this.rooms[i];

    const room = new Room(id);
    this.rooms.push(room);

    room.palette.baseColors = [
      '#ABCAF5', '#ABF5D6', '#D6ABF5',
      '#CAF5AB', '#EFF5AB'
    ];
    room.palette.defaultColor = '#ABCAF5';

    return room
  }

  join(userName, roomId) {
    if (!userName) return;
    const user = this.createUser(userName);
    const room = this.createRoom(roomId);
    const color = room.palette.getRandom();
    (roomId) ? user.room = roomId : user.room = room.id;
    room.join({ id: user.id, name: user.name, color });
    return { user, room, color}
  }

  leave(userId, roomId, color) {
    const i = this.users.findIndex(user => user.id === userId);
    (i >= 0) && this.users.splice(i, 1);
    const j = this.rooms.findIndex(room => room.id === roomId);
    const room = this.rooms[j];
    (room) && room.leave(userId, color);
  }

  get users() {
    return this._users
  }

  get rooms() {
    return this._rooms
  }
};