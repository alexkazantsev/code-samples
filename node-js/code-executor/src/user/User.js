const socket = Symbol('socket');

class User {
  /**
   * Base user implementation
   * @param {String} id 
   * @param {SocketIO} _socket 
   * @param {String} token
   * @returns {User}
   */
  constructor(id, _socket, token) {
    this.id = id;
    this.token = token;
    this[socket] = _socket;
  }

  /**
   * socket.on bindings
   * @param {String} type 
   * @param {Function} cb 
   * @returns {void}
   */
  on(type, cb) { this[socket].on(type, cb); }

  /**
   * socket.emit bindings
   * @param {String} type 
   * @param {[]:any} args 
   * @returns {void}
   */
  emit(type, ...args) { this[socket].emit(type, ...args); }

  /**
   * socket.removeListener bindings
   * @param {String} event 
   * @param {Function} cb 
   * @returns {void}
   */
  removeListener(event, cb) { this[socket].removeListener(type, cb); }

  /**
   * socket.removeAllListeners bindings
   * @returns {void}
   */
  removeAllListeners() { this[socket].removeAllListeners(); }

  /**
   * socket.disconnect bindings
   * @param {Boolean} force 
   * @returns {void}
   */
  disconnect(force = false) { this[socket].disconnect(force); }

}

module.exports = User;
