import { getEnv } from '../common/utils/get-env';

const {
  NODE_ENV,
  API_PORT,
  API_URL,
  PRIVATE_KEY_SHASTA,
} = getEnv();

export {
  NODE_ENV,
  API_PORT,
  API_URL,
  PRIVATE_KEY_SHASTA,
};
