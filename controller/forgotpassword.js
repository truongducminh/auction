var { query } = require('../db.js');
var { hashCode } = require('../hashCode.js');
var { sendResetPasswordEmail } = require('../mailer.js');
var resetQueue = {};

function requestResetPassword(req,res) {
    var { email } = req.body;
    var data = { success: false };
    if (!email) {
        data.error = { id: 102, message: 'Missing email' };
        return res.send(JSON.stringify(data));
    }
    var account;
    var sql = 'SELECT id_user,email,ten FROM "users" WHERE email=$1';
    var params = [email];
    query(sql,params)
    .then(result => {
        if (result.rowCount == 0) {
            data.error = { id: 80, message: 'User does not exist' };
            res.send(JSON.stringify(data));
        }
        else {
            account = result.rows[0];
            hashCode()
            .then(randomCode => {
                var verificationCode = randomCode;
                return sendResetPasswordEmail(email,account.ten,verificationCode);
            })
            .then(verificationCode => {
                resetQueue[verificationCode] = {
                    id: account.id_user,
                    countdown: setTimeout(() => delete resetQueue[verificationCode], 600*1000)
                };
                data.success = true;
                res.send(JSON.stringify(data));
            })
            .catch(err => {
                console.log(err);
                data.error = { id: 102, message: err + '' };
                res.send(JSON.stringify(data));
            });
        }
    })
    .catch(err => {
        console.log(err);
        data.error = { id: 102, message: err + '' };
        res.send(JSON.stringify(data));
    });
};

function verify(verificationCode){
    if (resetQueue[verificationCode]) return resetQueue[verificationCode];
    return undefined;
}

module.exports = { requestResetPassword, verify };
