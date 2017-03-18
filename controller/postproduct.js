var { verify } = require('../jwt.js');
var { newProduct } = require('../model/product-manager.js');
var moment = require('moment');

module.exports = (req,res) => {
    // verify(token)
    // .then(function(decoded){
    //     var { id, username, phone, exp } = decoded;
    //     if (exp*1000 <= Date.now())) {
    //         return socket.emit('SERVER_SEND_POST_RESULT', { success: 0, error: 'you have been log out' });
    //     }
    //     var sql = 'SELECT id FROM users WHERE id_user=$1 AND username=$2 AND sodienthoai=$3';
    //     var params = [id, username, phone];
    //     return query(sql,params);
    // })
    // .then(function(result){
    //     if (result.rowCount <= 0) return socket.emit('wrong login information, please login again');
    //     newProduct(name,image,startAt,duration,price,bidAmount,id, function(error) {
    //         if (error) {
    //             console.log(error);
    //             return socket.emit('SERVER_SEND_POST_RESULT', { success: 0, error: error + '\nissue at ' + moment().format() });
    //         });
    //         socket.emit('SERVER_SEND_POST_RESULT', { success: 1 });
    //     });
    // })
    // .catch(function(error){
    //     console.log(error);
    //     return socket.emit('SERVER_SEND_POST_RESULT', { success: 0, error: error + '\nissue at ' + moment().format() });
    // });
};
