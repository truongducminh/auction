var { query } = require('../db.js');
var { hashCode } = require('../hashCode.js');
var { verify } = require('./forgotpassword');

module.exports = (req,res) => {
    var newPassword;
    var verificationCode = req.params.verificationCode;
    console.log(verificationCode);
    var object = verify(verificationCode);
    if (object) {
        hashCode()
        .then(randomCode => {
            newPassword = randomCode;
            var sql = 'UPDATE "users" SET password=$1 WHERE id_user=$2';
            var params = [newPassword,object.id];
            return query(sql,params);
        })
        .then(result => {
            if (result.rowCount > 0) {
                clearTimeout(object.countdown);
                delete object;
                res.send('Your new password is: ' + newPassword);
            }
            else data.error.push({ id: 102, message: 'Reset password failed' });
            res.send();
        })
        .catch(err => {
            data.error.push({ id: 102, message: err + '' });
            res.send(data);
        });
    }
    else {
        data.error.push({ id: 102, message: 'wrong verification code' });
        res.send(data);
    }
};
