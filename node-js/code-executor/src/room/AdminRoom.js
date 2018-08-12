const BaseRoom = require('./BaseRoom');
const UserRoom = require('./UserRoom');
const ApiProvider = require('./../utils/ApiProvider');
const Admin = require('./../user/Admin');
const { EVENTS } = require('./../config');

const FN__CREATE_ROOM = Symbol('FN__CREATE_ROOM');
const FN__DELETE_ROOM = Symbol('FN__DELETE_ROOM');

class AdminRoom extends BaseRoom {
  constructor(id, namespace, ioInstance) {
    super(id, namespace);

    this.io = ioInstance;
    this.rooms = [];
  }

  /**
   * @override
   * @param {String|Number} user_id 
   * @param {SocketIO} socket 
   */
  createUser(user_id, socket, token) { return new Admin(user_id, socket, token); }

  /**
   * @override
   * @param {String|Number} user_id 
   * @param {String} token 
   */
  authenticateUser(user_id, token) { return ApiProvider.authenticateAdmin(user_id, token); }

  /**
   * @override
   * @param {User} user 
   */
  subscribe(user) {
    user.on(EVENTS.CREATE_ROOM, this[FN__CREATE_ROOM].bind(this));
    user.on(EVENTS.DELETE_ROOM, this[FN__DELETE_ROOM].bind(this));
  }

  /**
   * 
   * @param {Array<UserRoom>} rooms 
   * @returns {AdminRoom}
   */
  createUserRooms(rooms = []) {
    this.logger.info('Creating user\'s rooms');
    this.rooms.push(...rooms.map(rawRoom =>
      new UserRoom(rawRoom.id, rawRoom.programming_language,
        this.io.of(`/${rawRoom.id}`)).init())
    );
    return this;
  }

  /**
   * Create a new room
   * @param {Object} rawRoom 
   * @returns {void}
   */
  [FN__CREATE_ROOM]({ id, programming_language }) {

    if (!id) {
      this.logger.warn(`'id' is required field`);

      this.admin_room.emit(EVENTS.CREATE_ROOM_ERROR, { error: 'Bad request.' });
      return false;
    }

    const _room = this.rooms.find(r => r.id === id);

    if (_room) {
      this.logger.info(`Updating room ${id}`);
      _room.updateRoom({ language: programming_language });
    } else {
      const room = new UserRoom(id, programming_language, this.io.of(`/${id}`)).init();
      this.logger.info(`Created new room: ${room.id} :: ${room.namespace.name}`);
      this.rooms.push(room);
    }
  }

  /**
   * Remove ane room
   * @param {String|Number} id
   * @returns {void}
   */
  [FN__DELETE_ROOM]({ id }) {
    this.logger.info(`Removing room: ${id}`);

    const index = this.rooms.findIndex(room => room.id == id);
    if (index < 0) this.logger.warn(`Can't find room with id ${id}`);
    if (index >= 0) {
      const room = this.rooms[index];
      room.destroy();
      this.rooms.splice(index, 1);
    }
  }
}

module.exports = AdminRoom;
