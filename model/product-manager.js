var _ = require('underscore');
var moment = require('moment');
var { query } = require('../db.js');

// -- begin -- run on start
var products = {};
var productsInfo = {};
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
    var sql = `SELECT id_sp,ten_sp,gia,giasan,giatran,hinh,ngaybatdau,ngayketthuc,mota,bid_amount,trang_thai,
        ten_loai_sp,id_user_cao_nhat,
        id_user_ban,ho,ten,sodienthoai
    	FROM san_pham
        INNER JOIN users ON san_pham.id_user_ban = users.id_user
        INNER JOIN loai_sp ON san_pham.id_loai_sp = loai_sp.id_loai_sp
        WHERE ngaybatdau < $1 AND $1 < ngayketthuc AND gia < giatran
        ORDER BY ngayketthuc DESC`;
    var params = [moment().format()];
    query(sql,[moment().format()])
    .then(result => {
        var arrSP = result.rows;
        products = {};
        for (var i = 0; i < arrSP.length; i++) {
            var key = arrSP[i].id_sp;
            products[key] = {
                image: arrSP[i].hinh,
                name: arrSP[i].ten_sp,
                description: arrSP[i].mota,
                startPrice: arrSP[i].giasan,
                ceilPrice: arrSP[i].giatran,
                startAt: arrSP[i].ngaybatdau.substr(0, arrSP[i].ngaybatdau.length - 6).replace(' ',' lúc '),
                endAt: arrSP[i].ngayketthuc.substr(0, arrSP[i].ngayketthuc.length - 6).replace(' ',' lúc '),
                displayCurrentPrice: arrSP[i].gia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + '.000',
                displayNextPrice: (arrSP[i].gia + arrSP[i].bid_amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + '.000',
                category: arrSP[i].ten_loai_sp,
                sellerId: arrSP[i].id_user_ban,
                sellerFirstname: arrSP[i].ten,
                sellerPhone: arrSP[i].sodienthoai,
                isOn: arrSP[i].trang_thai
            };
            var t = Date.now();
            var q = Date.parse(arrSP[i].ngayketthuc);
            productsInfo[arrSP[i].id_sp] = {
                price: arrSP[i].gia,
                bidAmount: arrSP[i].bid_amount,
                duration: parseInt((q - t) / 1000, 10),
            };
            query('SELECT id_user,ten,ho FROM "users" WHERE id_user=$1',[arrSP[i].id_user_cao_nhat])
            .then(function (result1) {
                if (result1.rowCount > 0) {
                    products[key].highestUserId = result1.rows[0].id_user;
                    products[key].highestUserName = result1.rows[0].ho + ' ' + result1.rows[0].ten;
                }
                else {
                    products[key].highestUserId = -1;
                    products[key].highestUserName = '';
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
    })
    .catch(err => {
        console.log(err);
    });
}

function getProducts() {
    var data = [];
    Object.keys(products).forEach(key => {
        var product = products[key];
        var productInfo = productsInfo[key];
        productInfo.duration--;
        var timeleft = timeleftFormat(productInfo.duration);
        if (productInfo.duration === 0 || productInfo.price === product.ceilPrice) {
            product.isOn = false;
            data.push(Object.assign({ id: key, timeleft }, product));
            delete productsInfo[key];
            delete products[key];
        }
        else {
            data.push(Object.assign({ id: key, timeleft }, product));
        }
    });
    return data;
}

function bid(productId,bidderId,bidderName, cb) {
    var info = productsInfo[productId];
    var product = products[productId];
    var newPrice = info.price + info.bidAmount;
    var sql = 'UPDATE san_pham SET gia=$2,id_user_cao_nhat=$3 WHERE id_sp=$1';
    var params = [productId,newPrice,bidderId];
    query(sql,params)
    .then(result => {
        if (result.rowCount > 0) {
            product.highestUserId = bidderId;
            product.highestUserName = bidderName;
            info.price += info.bidAmount;
            product.displayCurrentPrice = info.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + '.000';
            product.displayNextPrice = (info.price + info.bidAmount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + '.000';
            return cb(undefined);
        }
        else {
            return cb(new Error('cannot update product'));
        }
    })
    .catch(error => {
        return cb(error);
    });
}

function newProduct(productName,productImage,productStartPrice,productCeilPrice,productDescription,duration,bidAmount,categoryId,sellerId, cb) {
    var sql = `INSERT INTO san_pham(ten_sp,hinh,mota,
        ngaybatdau,ngayketthuc,
        giasan,giatran,gia,
        bid_amount,id_loai_sp,id_user_ban)
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`;
    var params = [productName,productImage,productDescription,
        moment().format(),moment(Date.now() + duration*60*60*1000).format(),
        productStartPrice/1000,productCeilPrice/1000,productStartPrice/1000,
        bidAmount/1000,categoryId,sellerId];
    query(sql,params)
    .then(result => {
        loadProduct();
        return cb(undefined);
    })
    .catch(error => {
        return cb(error);
    });
}

module.exports = { getProducts, bid, newProduct };
