const nanoid = require('nanoid'),
      Palette = require('./Palette');

module.exports = class Room {
  constructor(id) {
    this._id = id;
    this._users = [];
    this._palette = new Palette();

    if (!id) {
      this.id = nanoid(6);
    }
  }

  join({ id, name, color }) {
    const i = this.users.findIndex(user => user.id === id);
    (i < 0) && this.users.push({ id, name, color });
  }

  leave(userId, color) {
    const i = this.users.findIndex(user => user.id === userId);
    (i >= 0) && this.users.splice(i, 1);
    this.palette.resetColor(color);
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get users() {
    return this._users
  }

  get palette() {
    return this._palette;
  }
};
