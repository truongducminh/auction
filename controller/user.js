var { query } = require('../db.js');
var { verify,getNewToken } = require('../jwt.js');

module.exports = (req,res) => {
    var { token } = req.body;
    var obj;
    var data = { success: false };
    verify(token)
    .then(function(decoded){
        obj = decoded;
        var sql = 'SELECT ho as lastName, ten as firstName, sodu as balance FROM "users" WHERE id_user=$1 AND username=$2 AND sodienthoai=$3';
        var params = [decoded.id,decoded.username,decoded.phone];
        return query(sql,params);
    })
    .then(result => {
        if (result.rowCount > 0) {
            console.log('user ' + obj.id + ' - ' + obj.username + ' has relogin');
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
        console.log(error);
        data.error = { id: 104, message: error + '\nissue at ' + moment().format() };
        res.send(JSON.stringify(data));
    });
};
