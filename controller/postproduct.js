var { newProduct } = require('../model/product-manager.js');
var { query } = require('../db.js');
var { verify,getNewToken } = require('../jwt.js');
var { DIRNAME, DOMAIN_NAME } = require('../config.js')
var formidable = require('formidable');
var moment = require('moment');
var fs = require('fs');

module.exports = (req,res) => {
    var form = new formidable.IncomingForm();
    var imageName = '';
    var productInfo = {};
    var data = { success: false };
    form.on('fileBegin', function(name, file) {
        imageName = file.name;
        file.path = DIRNAME + '/public/img/product/'  + file.name;
        productInfo.image = DOMAIN_NAME + '/img/product/'  + file.name;
    });
    form.on('file', function (name, file)   {
        console.log('Uploaded ' + file.name);
    });
    form.on('error', function(err) {
        console.log(err);
        data.error = { id: 104, message: err + '\nissue at ' + moment().format() };
    });
    if (data.error) return res.send(data);
    new Promise(function(resolve, reject) {
        form.parse(req, function(err, fields, files) {
            if (err) return reject(err);
            return resolve(fields.info);
        });
    })
    .then(info => {
        Object.assign(productInfo,JSON.parse(info));
        return verify(productInfo.token);
    })
    .then(decoded => {
        var { id, username, phone, exp } = decoded;
        if (exp*1000 <= Date.now()) {
            data.error = { id: 99, message: 'you have been log out' };
            res.send(data);
        }
        else {
            data.token = getNewToken(decoded);
            var sql = 'SELECT id_user FROM users WHERE id_user=$1 AND username=$2 AND sodienthoai=$3';
            var params = [id, username, phone];
            query(sql,params)
            .then(function(result){
                if (result.rowCount <= 0) return data.error = { id: 98, message: 'wrong login information, please login again' };
                newProduct(productInfo.productName, productInfo.image,
                    productInfo.productStartPrice, productInfo.productCeilPrice,
                    productInfo.productDescription, productInfo.duration, productInfo.bidAmount,
                    productInfo.categoryId, id,
                    error => {
                        if (error) {
                            console.log(error);
                            data.error = { id: 104, message: error + '\nissue at ' + moment().format() };
                            fs.unlink(DIRNAME + '/public/img/product/'  + imageName);
                        }
                        else {
                            console.log('user ' + username + ' has registered a product : ' + productInfo.productName);
                            data.success = true;
                        }
                        res.send(data);
                    }
                );
            })
            .catch(function(error){
                console.log(error);
                data.error = { id: 104, message: error + '\nissue at ' + moment().format() };
                res.send(data);
                fs.unlink(DIRNAME + '/public/img/product/'  + imageName);
            });
        }
    })
    .catch(function(error){
        console.log(error);
        data.error = { id: 104, message: error + '\nissue at ' + moment().format() };
        res.send(data);
        fs.unlink(DIRNAME + '/public/img/product/'  + imageName);
    });
};
