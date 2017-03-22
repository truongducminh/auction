var { newProduct } = require('../model/product-manager.js');
var { query } = require('../db.js');
var { verify,getNewToken } = require('../jwt.js');
var formidable = require('formidable');
var moment = require('moment');

module.exports = (req,res) => {
    console.log(req.body);
    var data = { success: false };
    verify(token)
    .then(function(decoded){
        var { id, username, phone, exp } = decoded;
        if (exp*1000 <= Date.now()) {
            return data.error = { success: 0, error: 'you have been log out' };
        }
        var sql = 'SELECT id FROM users WHERE id_user=$1 AND username=$2 AND sodienthoai=$3';
        var params = [id, username, phone];
        return query(sql,params);
    })
    .then(function(result){
        if (result.rowCount <= 0) return data.error = { success: 0, error: 'wrong login information, please login again' };
        var form = new formidable.IncomingForm();
        form.on('fileBegin', function(name, file) {
            console.log(name);
            console.log(file);
            file.path = __dirname + '/img/product' + Date.now()  + file.name;
        });
        form.on('file', function (name, file)   {
            console.log(name);
            console.log('Uploaded ' + file.name);
            newProduct(name,file.name,startAt,endAt,price,bidAmount,userId, function(error) {
                if (error) {
                    console.log(error);
                    data.error = { success: 0, error: error + '\nissue at ' + moment().format() };
                }
                else data.success = true;
                res.send(data);
                // id.emit('SERVER_SEND_POST_RESULT', { success: 1 });
            });
        });
        form.on('error', function(err) {
            console.log(err);
            data.error = { success: 0, error: err + '\nissue at ' + moment().format() };
            res.send(data);
        });
    })
    .catch(function(error){
        console.log(error);
        data.error = { success: 0, error: error + '\nissue at ' + moment().format() };
        res.send(data);
    });
};
