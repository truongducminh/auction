var config = {}
var os = require('os');
var ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach(function (ifname) {
    ifaces[ifname].forEach(function (iface) {
        if (iface.internal !== false) {
            config[iface.family] = iface.address;
        }
    });
});

const DOMAIN_NAME = 'http://192.168.1.110:3000';
const PORT = process.env.PORT || 3000;
module.exports = Object.assign({ PORT,DOMAIN_NAME },config);
