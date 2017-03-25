var { query } = require('../db.js');
var { hashCode } = require('../hashCode.js');
var { sendRegisterEmail } = require('../mailer.js');
var moment = require('moment');
var registerQueue = {};

module.exports = (req,res) => {
    var { firstname,lastname,email,phone,username,password } = req.body;
    var data = { success: false };
    if (!req.body.code) {
        var sql = 'SELECT username,email,sodienthoai FROM "users" WHERE username=$1 OR email=$2 OR sodienthoai=$3';
        var params = [username,email,phone];
        query(sql,params)
        .then(result => {
            if (result.rowCount == 0) {
                hashCode()
                .then(randomCode => {
                    var verificationCode = randomCode;
                    return sendRegisterEmail(email,firstname,verificationCode);
                })
                .then(verificationCode => {
                    registerQueue[verificationCode] = {
                        username,email,phone,firstname,lastname,password,
                        countdown: setTimeout(() => delete registerQueue[verificationCode], 600*1000)
                    };
                    data.success = true;
                    res.send(JSON.stringify(data));
                })
                .catch(err => {
                    data.error = { id: 104, message: err + '' };
                    res.send(JSON.stringify(data));
                });
            }
            else {
                result.rows.forEach(e => {
                    if (e.email == email) data.error = { id: 98, message: 'Email is taken' };
                    else if (e.sodienthoai == phone) data.error = { id: 99, message: 'Phone number is taken' };
                    else if (e.username == username) data.error = { id: 97, message: 'Username is taken' };
                });
                res.send(JSON.stringify(data));
            }
        })
        .catch(err => {
            data.error = { id: 104, message: err + '' };
            res.send(JSON.stringify(data));
        });
    }
    else {
        var verificationCode = req.body.code;
        var info = registerQueue[verificationCode];
        if (!info) {
            data.error = { id: 101, message: 'Wrong verification code' };
            res.send(JSON.stringify(data));
        }
        else {
            if (email != info.email) {
                data.error = { id: 102, message: 'wrong email' };
                return res.send(JSON.stringify(data));
            }
            var sql = 'INSERT INTO "users"(username, password, ten, ho, email, sodienthoai, ngaydangky) VALUES($1,$2,$3,$4,$5,$6,$7)';
            var params = [info.username,info.password,info.firstname,info.lastname,email,info.phone,moment().format()];
            query(sql,params)
            .then(result => {
                if (result.rowCount > 0) {
                    clearTimeout(info.countdown);
                    delete registerQueue[verificationCode];
                    data.success = true;
                }
                else data.error = { id: 12, message: 'database insert error' };
                res.send(JSON.stringify(data));
            })
            .catch(error => {
                res.send(JSON.stringify(data));
            });
        }
    }
};
