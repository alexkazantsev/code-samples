const EVENTS = {
  USER_DISCONNECT: 'disconnect',
  ROOM_JOIN_REQUEST: 'in::room::new-user-request',
  ROOM_JOIN_SUCCESS: 'out::room::join-success',
  ROOM_JOIN_ERROR: 'out::room::join-error',
  ROOM_NEW_USER: 'out::room::new-user',
  ROOM_LEAVE: 'out::room::user-leave',
  IN_ROOM_CHANGE_LANGUAGE: 'in::room::change-language',
  OUT_ROOM_CHANGE_LANGUAGE: 'out::room::change-language',
  EXECUTION_START: 'code::execution-start',
  CODE_RUN: 'in::code::execute',
  CODE_DONE: 'out::code::done',
  CODE_ERROR: 'out::stdou::error',
  STDIN_SEND: 'in::stdin::send',
  STDIN_SEND_ERROR: 'out::stdin::send-error',
  STDOUT_SEND: 'out::stdout::send',
  PROCESS_KILL: 'in::code::stop',

  AUTH_SUCCESS: 'auth::success',
  AUTH_FAILED: 'auth::failed',

  CREATE_ROOM: 'admin::room::create-or-update',
  CREATE_ROOM_ERROR: 'admin::room::create-error',
  DELETE_ROOM: 'admin::room::delete',
};

const {
  LOG_LEVEL = 'debug',
  API_URL,
  API_TOKEN,
} = process.env;

const ENV_VARIABLES = { API_URL, API_TOKEN };

const DOCKER_IMAGES = ['python:2.7-slim','python:3-slim']

module.exports = {
  EVENTS,
  ENV_VARIABLES,
  DOCKER_IMAGES,
};
