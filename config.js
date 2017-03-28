const DIRNAME = __dirname;
const DOMAIN_NAME = 'https://bs-auction.herokuapp.com';
const PORT = process.env.PORT || 3000;
module.exports = Object.assign({ PORT,DOMAIN_NAME,DIRNAME });
