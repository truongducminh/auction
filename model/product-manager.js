var _ = require('underscore');
var moment = require('moment');
var { query } = require('../db.js');

// -- begin -- run on start
var products = {};
var durations = {};
loadProduct();
// -- end -- run on start

function timeleftFormat(duration) {
    var hours = String(parseInt(duration / 3600, 10)); duration -= 3600 * hours;
    var minutes = String(parseInt(duration / 60, 10));
    var seconds = duration - 60 * minutes;

    var output = _.map([hours, minutes, seconds], function(str) {
        if (str.length === 1) {
            str = "0" + str;
        }
        return str;
    }).join(":");
    return output;
};

function loadProduct() {
    var sql = `SELECT id_sp,ten_sp,gia,hinh,ngaydang,ngaybatdau,ngayketthuc,mo_ta_tom_tat,mota,bid_amount,
        ten_loai_sp,
        id_user_ban,ho,ten
    	FROM san_pham
        INNER JOIN users ON san_pham.id_user_ban = users.id_user
        INNER JOIN loai_sp ON san_pham.id_loai_sp = loai_sp.id_loai_sp
        WHERE ngaybatdau <= $1
        ORDER BY ngayketthuc DESC`;
    var params = [moment().format()];
    query(sql,[moment().format()])
    .then(result => {
        var arrSP = result.rows;
        for (var i = 0; i < arrSP.length; i++){
            products[arrSP[i].id_sp] = {
                image: arrSP[i].hinh,
                name: arrSP[i].ten_sp,
                issueAt: arrSP[i].ngaydang,
                startAt: arrSP[i].ngaybatdau,
                expireAt: arrSP[i].ngayketthuc,
                price: arrSP[i].gia,
                bidAmount: arrSP[i].bid_amount,
                category: arrSP[i].ten_loai_sp,
                sellerId:  arrSP[i].id_user_ban,
                sellerFirstname:  arrSP[i].ten,
                sellerLastname:  arrSP[i].ho
            };
            var t = Date.parse(arrSP[i].ngaybatdau);
            var q = Date.parse(arrSP[i].ngayketthuc);
            durations[arrSP[i].id_sp] = parseInt((q - t) / 1000, 10);
        }
    })
    .catch(err => {
        console.log(err);
    });
}

function getProducts() {
    var data = [];
    Object.keys(products).forEach(key => {
        if (durations[key] > 0) {
            durations[key]--;
            var timeleft = timeleftFormat(durations[key]);
            data.push(Object.assign({ id: key, displayPrice: products[key].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ',000 VND', timeleft }, products[key]));
        }
        else {
            delete durations[key];
            delete products[key];
        }
    });
    data.sort((a,b) => Date.parse(a.ngayketthuc) - Date.parse(b.ngayketthuc));
    return data;
}

function bid(productId, cb) {
    var sql = 'UPDATE san_pham SET gia=$1 WHERE id_sp=$2';
    var params = [products[productId].price + products[productId].bidAmount,productId];
    query(sql,params)
    .then(result => {
        if (result.rowCount > 0) {
            products[productId].price += products[productId].bidAmount;
            return cb(undefined);
        }
    })
    .catch(error => {
        return cb(error);
    });
}

function newProduct(name,image,startAt,duration,price,bidAmount,sellerId, cb) {
    var sql = 'INSERT INTO san_pham(ten_sp,hinh,ngaydang,ngaybatdau,ngayketthuc,gia,bid_amount,id_user_ban) VALUES($1,$2,$3,$4,$5,$6,$7)';
    var params = [name,image,moment().format(),moment(startAt).format(),moment(startAt + duration).format(),price,bidAmount,sellerId];
    query(sql,params)
    .then(result => {
        if (result.rowCount > 0) {
            setTimeout(() => {
                loadProduct();
            },startAt - Date.now());
            return cb(undefined);
        }
    })
    .catch(error => {
        return cb(error);
    });
}

module.exports = { getProducts, bid };
