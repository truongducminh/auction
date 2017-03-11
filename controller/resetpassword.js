var { query } = require('../db.js');

module.exports = (req,res) => {
    if (!req.body.code) return res.send('missing parameters');
    var data = { success: 0, error: [] };
    var { code } = req.body;
    // if code is invalid
    // send('wrong code');

    // if code is valid
    var password = 'random';
    var sql = 'UPDATE "users" SET password=$1';
    var params = [password];
    query(sql,params)
    .then(result => {
        // send password
    })
    .catch(err => {
        console.log(err);
        data.error.push({ id: 102, message: 'Query error' });
        res.send(data);
    });
};
