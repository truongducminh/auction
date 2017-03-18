var config = {}


const DOMAIN_NAME = 'http://192.168.1.110:3000';
const PORT = process.env.PORT || 3000;
module.exports = Object.assign({ PORT,DOMAIN_NAME },config);
