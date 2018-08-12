const agent = require('./agent');
const Logger = require('./Logger');

const logger = new Logger('ApiProvider');

class ApiProvider {

  /**
   * Fetch all valid rooms from the REST API service
   * @returns {Promise<Array<Object>>}
   */
  static async getAllRooms() {
    try {
      const { data } = await agent.get('/code_executor/lesson_sessions');
      return data;
    } catch (error) {
      logger.error(`getAllRooms error -> `, error);
      return Promise.resolve([]);
    }
  }

  /**
   * Authenticate user on the REST API
   * @param {String|Number} user_id
   * @param {String} token
   * @returns {Promise<any>}
   */
  static authenticateUser(user_id, token) {
    return Promise.resolve();
  }

  /**
   * Authenticate admin on the REST API
   * @returns {Promise<any>}
   */
  static authenticateAdmin(user_id, token) {
    return Promise.resolve();
  }
}

module.exports = ApiProvider;
