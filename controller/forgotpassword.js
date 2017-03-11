var { query } = require('../db.js');

module.exports = (req,res) => {
    var { phone } = req.body;
    var data = { success: 0, error: [] };
    var sql = 'SELECT sodienthoai FROM "users" WHERE sodienthoai=$1';
    var params = [phone];
    query(sql,params)
    .then(result => {
        // create {code,username}
        // send code
    })
    .catch(err => {
        console.log(err);
        data.error.push({ id: 102, message: 'Query error' });
        res.send(data);
    });
};
