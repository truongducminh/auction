var { query } = require('../db.js');
var { verify,getNewToken } = require('../jwt.js');

module.exports = (req,res) => {
    var { token } = req.body;
    var data = { success: false };
    verify(token)
    .then(function(decoded){
        var now = Math.floor(Date.now()/(1000));
        if (decoded.exp*1000 < now) {
            data.error = { id: 71, message: 'you have been log out' };
            return res.send(JSON.stringify(data));
        }
        var sql = 'SELECT * FROM "users" WHERE username=$1';
        var params = [decoded.username];
        return query(sql,params);
    })
    .then(result => {
        if (result.rowCount > 0) {
            data.profile = result.rows[0];
            data.token = getNewToken(obj);
            data.success = true;
            res.send(JSON.stringify(data));
        }
        else {
            data.error = { id: 81, message: 'account does not exist' };
            res.send(JSON.stringify(data));
        }
    })
    .catch(function(error){
        console.log(err);
        data.error = { id: 81, message: err + '' };
        res.send(JSON.stringify(data));
    });
};
