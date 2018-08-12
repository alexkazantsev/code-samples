const BaseRoom = require('./BaseRoom');
const Executor = require('./../executor/Executor');
const User = require('./../user/User');
const ApiProvider = require('./../utils/ApiProvider');
const { EVENTS } = require('./../config');

const FN__EXECUTOR_HANDLERS = Symbol('FN__EXECUTOR_HANDLERS');

const FN__ON_USER_DISCONNECT = Symbol('FN__ON_USER_DISCONNECT');
const FN__ON_CHANGE_LANGUAGE = Symbol('FN__ON_CHANGE_LANGUAGE');
const FN__ON_RUN_CODE = Symbol('FN__ON_RUN_CODE');
const FN__ON_STDIN_SEND = Symbol('FN__ON_STDIN_SEND');
const FN__ON_PROCESS_KILL = Symbol('FN__ON_PROCESS_KILL');

class UserRoom extends BaseRoom {
  constructor(id, programming_language, namespace) {
    super(id, namespace);

    this.language = programming_language || 'python2';
    this.executor = null;
  }

  updateRoom({ language = 'python2' }) { this.language = language; }

  /**
   * @override
   * @param {String|Number} user_id 
   * @param {SocketIO} socket 
   */
  createUser(user_id, socket, token) {
    this.logger.info(`Creating a new user ${user_id}`);
    return new User(user_id, socket, token);
  }

  /**
   * @override
   * @param {String|Number} user_id 
   * @param {String} token 
   */
  authenticateUser(user_id, token) { return ApiProvider.authenticateUser(user_id, token); }

  /**
   * @override
   * @param {User} user 
   */
  subscribe(user) {
    user.on(EVENTS.USER_DISCONNECT, this[FN__ON_USER_DISCONNECT].bind(this, user.id));
    user.on(EVENTS.IN_ROOM_CHANGE_LANGUAGE, this[FN__ON_CHANGE_LANGUAGE].bind(this));
    user.on(EVENTS.CODE_RUN, this[FN__ON_RUN_CODE].bind(this, user.id));
    user.on(EVENTS.STDIN_SEND, this[FN__ON_STDIN_SEND].bind(this, user.id));
    user.on(EVENTS.PROCESS_KILL, this[FN__ON_PROCESS_KILL].bind(this, user.id));
  }

  /**
   * Send language an executing status with success message
   * @override
   * @param {User} user 
   */
  onAuthSuccess(user) {
    user.emit(EVENTS.AUTH_SUCCESS, {
      language: this.language,
      executing: !!this.executor,
    });
  }

  /**
   * Native socket disconnec event
   * @returns {void}
   */
  [FN__ON_USER_DISCONNECT](id) {
    this.logger.info(`User ${id} was disconnected`);
    this.deleteUser(id);
    if (this.executor && !this.users.length) {
      this.logger.info('There is no users. Stop the running process.');
      this.executor.kill();
    }
  }

  /**
   * Change language execution of the room
   * @param {String} language 
   * @returns {Boolean|void}
   */
  [FN__ON_CHANGE_LANGUAGE]({ language }) {
    if (this.executor) {
      this.logger
        .warn(`Trying to change language from '${this.language}' to '${language}', but executor has already axist.`);
      return false;
    }
    this.logger.info(`Changing the language of the room from '${this.language}' to '${language}'`);
    this.language = language;
    this.emit(EVENTS.OUT_ROOM_CHANGE_LANGUAGE, { language });
  }

  /**
   * Create a new Executor instance, run the code and notify avaryone about that.
   * @param {String} code 
   * @returns {void}
   */
  [FN__ON_RUN_CODE](id, { code }) {
    if (this.executor) {
      this.logger.warn(`User ${id} trying to execute a code, but executor has already exist.`);
      return false;
    }

    this.logger.info(`User ${id} executing a code: ${code}`);

    this.emit(EVENTS.EXECUTION_START, { user_id: id });
    this.executor = new Executor(this.language);
    this.executor.run(code, () => this[FN__EXECUTOR_HANDLERS]())
  }

  /**
   * Send the message to the process stdin
   * @param {String} message
   * @param {String} id
   * @returns {Boolean|void}
   */
  [FN__ON_STDIN_SEND](id, { message }) {
    if (!this.executor) {
      this.logger.warn(`User ${id} trying to send stdin message. Can't do it as the executor does not exist`);

      const user = this.findUser(id);
      if (user) user.emit(EVENTS.STDIN_SEND_ERROR, { error: 'Executor does not exist' });
      return false;
    }
    this.logger.info(`User ${id} sending stdin message to the executor`);

    this.executor.writeSTDIN(message);
    this.emit(EVENTS.STDIN_SEND, { message, user_id: id });
  }

  [FN__ON_PROCESS_KILL](id) {
    this.logger.info(`User ${id} send kill process command`);

    if (!this.executor) return false;
    this.executor.kill();
  }

  /**
   * Handle executor events
   * @returns {void}
   */
  [FN__EXECUTOR_HANDLERS]() {
    this.executor.onData(data => this.emit(EVENTS.STDOUT_SEND, { data }));
    this.executor.onError(error => this.emit(EVENTS.CODE_ERROR, { error }));
    this.executor.onDone(() => {
      this.emit(EVENTS.CODE_DONE);
      this.executor = null;
    });
  }
}

module.exports = UserRoom;
