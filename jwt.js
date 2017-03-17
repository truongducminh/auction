var fs = require('fs');
var jwt = require('jsonwebtoken');
const KEY = 'auction10!1@1';

function sign(obj) {
    return jwt.sign(obj, KEY, { expiresIn: "30 minutes" });
}

function verify(token) {
    return new Promise(function(resolve, reject) {
        jwt.verify(token,KEY, function(error,decoded){
            if (error) return reject(error);
            return resolve(decoded);
        });
    });
}

function getNewToken(obj) {
    obj.exp = Math.floor(Date.now()/(1000)) + 30*60;
    return jwt.sign(obj,KEY);
}

module.exports = { sign,verify,getNewToken };
