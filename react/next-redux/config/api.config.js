const env = process.env.NODE_ENV;

export default require(`./api.${env}.config.js`); // eslint-disable-line
