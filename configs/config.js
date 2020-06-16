const config = require('dotenv'); //module to configure environment variables
const ambiente = config.config(); //loads environment variables created in .env

const { parsed: env } = ambiente;
module.exports = env;
