var { query } = require('../db.js');
var moment = require('moment');

module.exports = (req,res) => {
    var { username,email,phone } = req.body;
    var data = { success: 0, error: [] };
    if (!req.body.code) {
        var sql = 'SELECT username,email,sodienthoai FROM "users" WHERE username=$1 OR email=$2 OR sodienthoai=$3';
        var params = [username,email,phone];
        query(sql,params)
        .then(result => {
            if (result.rowCount == 0) {
                data.success = 1;
                console.log(data);
            }
            else {
                result.rows.forEach(e => {
                    if (e.sodienthoai == phone) data.error.push({ id: 99, message: 'Phone number is taken' });
                    if (e.email == email) data.error.push({ id: 98, message: 'Email is taken' });
                    if (e.username == username) data.error.push({ id: 97, message: 'Username is taken' });
                });
            }
            res.send(data);
            // send code
        })
        .catch(err => {
            console.log(err);
            data.error.push({ id: 102, message: 'Query error' });
            res.send(data);
        });
    }
    else {
        // code is invalid
            data.error.push({  });
        // code is valid
            var { firstname,lastname,password } = req.body;
            var sql = 'INSERT INTO "users"(username, password, ten, ho, email, sodienthoai, ngaydangky) VALUES($1,$2,$3,$4,$5,$6,$7)';
            var params = [username,password,firstname,lastname,email,phone,moment().format()];
            query(sql,params)
            .then(result => {
                if (result.rowCount > 0)
                    data.success = 1;
                else data.error.push({});
                res.send(data);
            })
            .catch(error => {

            });
    }
};
