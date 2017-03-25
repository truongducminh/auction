var config = {}

const DIRNAME = __dirname;
const DOMAIN_NAME = 'http://192.168.1.170:3000';
const PORT = process.env.PORT || 3000;
module.exports = Object.assign({ PORT,DOMAIN_NAME,DIRNAME },config);
