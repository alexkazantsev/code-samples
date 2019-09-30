import { getEnv } from '../common/utils/get-env';

const {
  NODE_ENV,
  API_PORT,
} = getEnv();

export {
  NODE_ENV,
  API_PORT,
};
