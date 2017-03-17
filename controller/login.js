var { query } = require('../db.js');
var { sign } = require('../jwt.js');

module.exports = (req,res) => {
    var { username,password } = req.body;
    var data = { success: false };
    if (!username) {
        data.error = { id: 123, message: 'username is empty'};
        return res.send(JSON.stringify(data));
    }
    if (!password) {
        data.error = { id: 123, message: 'password is empty'};
        return res.send(JSON.stringify(data));
    }
    var sql = 'SELECT id_user,username,sodienthoai FROM "users" WHERE username=$1 AND password=$2';
    var params = [username,password];
    query(sql,params)
    .then(result => {
        if (result.rowCount > 0) {
            data.token = sign({ id: result.rows[0].id_user, username: result.rows[0].username, phone: result.rows[0].sodienthoai });
            data.success = true;
            res.send(JSON.stringify(data));
        }
        else {
            data.error = { id: 81, message: 'wrong username or password' };
            res.send(JSON.stringify(data));
        }
    })
    .catch(err => {
        console.log(err);
        data.error = { id: 81, message: err + '' };
        res.send(JSON.stringify(data));
    });
};