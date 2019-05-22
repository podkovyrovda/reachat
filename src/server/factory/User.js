const shortid = require('shortid');

module.exports = class User {
  constructor(name) {
    this.name = name;
    this._id = null;
    this._room = null;

    this.id = shortid.generate();
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get room() {
    return this._room;
  }

  set room(id) {
    this._room = id;
  }
};
