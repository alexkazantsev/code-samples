const ApiProvider = require('./../utils/ApiProvider');
const AdminRoom = require('./AdminRoom');
const Logger = require('./../utils/Logger');

const ADMIN_ID = 'admin';
const LOGGER = Symbol('LOGGER');

class RoomManager {

  /**
   * @param {SocketIO} io 
   * @returns {RoomManager}
   */
  constructor(io) {
    this.io = io;
    this.admin_room = null;

    this[LOGGER] = new Logger('RoomManager');
  }

  /**
   * Fetch all user rooms from the server & create admin room with those rooms inside.
   * @returns {void}
   */
  async init() {

    this[LOGGER].info('init');
    this[LOGGER].info('fetching rooms...');

    const rooms = await ApiProvider.getAllRooms();

    this[LOGGER].info(`fetched ${rooms.length} rooms`);

    this.admin_room = new AdminRoom(ADMIN_ID, this.io.of(`/${ADMIN_ID}`), this.io)
      .createUserRooms(rooms)
      .init();
  }

}

module.exports = RoomManager;
