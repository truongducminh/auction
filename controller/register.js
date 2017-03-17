var { query } = require('../db.js');
var { hashCode } = require('../hashCode.js');
var moment = require('moment');
var registerQueue = {};

module.exports = (req,res) => {
    var { username,email,phone,firstname,lastname,password } = req.body;
    var data = { success: 0, error: [] };
    if (!req.body.code) {
        var sql = 'SELECT username,email,sodienthoai FROM "users" WHERE username=$1 OR email=$2 OR sodienthoai=$3';
        var params = [username,email,phone];
        query(sql,params)
        .then(result => {
            if (result.rowCount == 0) {
                hashCode()
                .then(randomCode => {
                    var verificationCode = randomCode;
                    //send code
                    registerQueue[verificationCode] = {
                        username,email,phone,firstname,lastname,password,
                        countdown: setTimeout(() => delete registerQueue[verificationCode], 600*1000)
                    };
                    console.log(registerQueue);
                    data.success = 1;
                    res.send(JSON.stringify(data));
                })
                .catch(err => {
                    res.send(JSON.stringify(data));
                });
            }
            else {
                result.rows.forEach(e => {
                    if (e.sodienthoai == phone) data.error.push({ id: 99, message: 'Phone number is taken' });
                    if (e.email == email) data.error.push({ id: 98, message: 'Email is taken' });
                    if (e.username == username) data.error.push({ id: 97, message: 'Username is taken' });
                });
                res.send(JSON.stringify(data));
            }
        })
        .catch(err => {
            console.log(err);
            data.error.push({ id: 102, message: 'Query error' });
            res.send(JSON.stringify(data));
        });
    }
    else {
        var verificationCode = req.body.code;
        var info = registerQueue[verificationCode];
        if (!info) {
            data.error.push({ id: 101, message: 'Wrong verification code' });
            res.send(JSON.stringify(data));
        }
        else {
            if (email != info.email) {
                data.error.push({ id: '12', message: 'wrong email'});
                return res.send(JSON.stringify(data));
            }
            console.log(registerQueue);
            var sql = 'INSERT INTO "users"(username, password, ten, ho, email, sodienthoai, ngaydangky) VALUES($1,$2,$3,$4,$5,$6,$7)';
            var params = [info.username,info.password,info.firstname,info.lastname,email,info.phone,moment().format()];
            query(sql,params)
            .then(result => {
                if (result.rowCount > 0) {
                    clearTimeout(info.countdown);
                    delete registerQueue[verificationCode];
                    data.success = 1;
                }
                else data.error.push({});
                res.send(JSON.stringify(data));
            })
            .catch(error => {
                res.send(JSON.stringify(data));
            });
        }
    }
};
