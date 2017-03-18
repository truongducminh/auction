var { verify } = require('../jwt.js');
var { query } = require('../db.js');
var { getProducts,bid } = require('../model/product-manager.js');
var moment = require('moment');

module.exports = (io,socket,data) => {
    console.log(data);
    var { token,productId } = data;
    verify(token)
    .then(function (decoded) {
        var { id, username, phone, exp } = decoded;
        if (exp*1000 <= Date.now()) {
            return socket.emit('SERVER_SEND_POST_RESULT', { success: 0, error: 'you have been log out' });
        }
        var sql = 'SELECT id_user,ten,ho FROM users WHERE id_user=$1 AND username=$2 AND sodienthoai=$3';
        var params = [id, username, phone];
        return query(sql,params);
    })
    .then(function (result) {
        if (result.rowCount == 0) return socket.emit('SERVER_SEND_POST_RESULT', { success: 0, error: 'account does not exist' });;
        var user = result.rows[0];
        console.log(user);
        bid(productId, user.id_user, user.ho + ' ' + user.ten, function (error) {
            if (error) return socket.emit('SERVER_SEND_BID_RESULT', { success: 0, error: error + '\nissue at ' + moment().format() });
            return io.emit('SERVER_SEND_HOME', getProducts());
        });
    })
    .catch(function (error) {
        console.log(error);
        return socket.emit('SERVER_SEND_BID_RESULT', { success: 0, error: error + '\nissue at ' + moment().format() });
    });
};
