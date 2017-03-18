var nodemailer = require('nodemailer');
transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'team.blueshark@gmail.com',
        pass: 'blueshark!101'
    }
});
var config = require('./config.js');

function sendResetPasswordEmail(receiver,firstname, verificationCode) {
    var mailOptions = {
        from: '"Trương Đức Minh" <truongducminh.dev@gmail.com>',
        to: receiver,
        subject: 'BlueShark account reset password',
        html: `<div style="width:80%;border:1px solid #444;">
            <div style="height:50px;background:#00d;font-size:200%;text-align:center;color:#fff;line-height:50px;">
                BlueShark
            </div>
            <div style="padding:2%">
                <div style="font-size:120%;line-height:30px;margin:10px 0;">
                    Hello ${firstname},
                    <br/>We receive a request to reset your BlueShark account. We're here to help!
                    <br/>Simply click on the button to get a new password:
                </div>
                <a
                    href="${config.DOMAIN_NAME}/resetPassword/${verificationCode}"
                    style="display:block;text-decoration:none;font-size:200%;color:#008;background:#aaf;width:200px;padding:15px;"
                    >
                    Reset password
                </a>
                <div style="font-size:120%;line-height:30px;margin:10px 0;">
                    Thank you!
                </div>
            </div>
        </div>`
    };
    return new Promise(function(resolve, reject) {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) return reject(err)
            else {
                console.log('Message %s sent: %s', info.messageId, info.response);
                return resolve(verificationCode);
            }
        });
    });
}

module.exports = { sendResetPasswordEmail };
