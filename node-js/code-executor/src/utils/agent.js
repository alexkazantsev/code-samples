const axios = require('axios');
const { ENV_VARIABLES } = require('./../config');

const agent = axios.create({
  baseURL: ENV_VARIABLES.API_URL,
  headers: { 'Authorization': `Bearer ${ENV_VARIABLES.API_TOKEN}`, }
});

module.exports = agent;
