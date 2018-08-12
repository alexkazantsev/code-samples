const { EVENTS } = require('./../config');
const Logger = require('./../utils/Logger');

class BaseRoom {

  /**
   * @param {String} id 
   * @param {SocketIO} namespase 
   * @param {String} language 
   */
  constructor(id, namespace) {
    this.id = id;
    this.namespace = namespace;
    this.users = [];

    this.logger = new Logger(`Room: ${this.id}`);
  }

  /**
   * io.emit wrapper
   * @param {String} type 
   * @param {any[]} args 
   * @returns {void}
   */
  emit(type, ...args) { this.namespace.emit(type, ...args); }

  /**
   * Find user by his id
   * @param {String} id 
   * @returns {User|undefined}
   */
  findUser(id) { return this.users.find(user => id === user.id); }

  /**
   * Add a new user to the room
   * @param {User} client 
   * @returns {void}
   */
  addUser(user) {
    this.logger.info(`Add new user: ${user.id}`);
    this.users.push(user);
    this.subscribe(user);
    this.emit(EVENTS.ROOM_NEW_USER, { user_id: user.id, users: this.users });
  }

  /**
   * Removing user from the room
   * @param {String|Number} id 
   * @returns {void}
   */
  deleteUser(id) {
    this.logger.info(`Remove user ${id} from the room`);
    const i = this.users.findIndex(c => c.id === id);
    if (i >= 0) {
      this.unsubscribe(id);
      this.emit(EVENTS.ROOM_LEAVE, { user_id: id });
      this.users.splice(i, 1);
    }
  }

  destroy() {
    this.logger.info('Preparing to destroy the room: unsubscribe all user\'s listeners and hard disconnect all users');
    this.users.forEach(user => {
      user.removeAllListeners();
      user.disconnect(true);
    });
  }

  /**
 * Remove all listeners
 * @param {String} id
 * @returns {Boolean|void}
 */
  unsubscribe(id) {
    const user = this.findUser(id);
    if (!user) return false;
    user.removeAllListeners();
  }

  /**
   * @abstract
   */
  authenticateUser() { throw new Error('You have to implement this method.'); }

  /**
   * @abstract
   */
  createUser() { throw new Error('You have to implement this method.'); }

  /**
   * Handle all socket events from client
   * @abstract
   */
  subscribe() { throw new Error('You have to implement this method.'); }

  /**
   * Send different data to different users.
   * @param {User} user 
   */
  onAuthSuccess(user) { user.emit(EVENTS.AUTH_SUCCESS); }

  /**
   * Init method implementation for all users.
   * @returns {BaseRoom}
   */
  init() {
    this.logger.info(`Created a new room`);

    this.namespace.on('connection', socket => {
      this.logger.info(`Connected a new socket: ${socket.id}`);

      socket.on('authorization', async ({ user_id, token }) => {
        const user = this.createUser(user_id, socket);
        this.logger.info(`Authorization request from user: ${user_id} with token: ${token}`);

        try {
          await this.authenticateUser({ user_id, token });
          this.logger.info(`User ${user_id} was successful autorized.`);

          this.addUser(user)
          this.onAuthSuccess(user);
        } catch (error) {
          this.logger.warn(`User ${user_id} authorization failed`, JSON.stringify(error || {}));
          user.emit(EVENTS.AUTH_FAILED, { error });
        }
      })
    });
    return this;
  }

}

module.exports = BaseRoom;
