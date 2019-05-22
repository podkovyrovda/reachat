const shortid = require('shortid');

module.exports = class Room {
  constructor(id) {
    this._id = id;
    this._users = [];

    if (!id) {
      this.id = shortid.generate();
    }
  }

  join({ id, name }) {
    const i = this.users.findIndex(user => user.id === id);
    (i < 0) && this.users.push({ id, name });
  }

  leave(userId) {
    const i = this.users.findIndex(user => user.id === userId);
    (i >= 0) && this.users.splice(i, 1);
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
};
