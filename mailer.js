var config = require('./config.js');
var nodemailer = require('nodemailer');
transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'team.blueshark@gmail.com',
        pass: 'blueshark!101'
    }
});
var mailOptions = {
    from: '"Team BlueShark" <team.blueshark@gmail.com>'
};

function sendRegisterEmail(receiver,firstname,verificationCode) {
    mailOptions.to = receiver;
    mailOptions.subject = 'Đăng ký tài khoản BlueShark';
    mailOptions.html =  `<div style="width:80%;border:1px solid #444;">
        <div style="height:50px;background:#00d;font-size:200%;text-align:center;color:#fff;line-height:50px;">
            BlueShark
        </div>
        <div style="padding:2%">
            <div style="font-size:120%;line-height:30px;margin:10px 0;">
                Chào ${firstname},
                <br/>Bạn hoặc ai đó đã dùng email này để đăng ký tài khoản BlueShark.
                <br/>Bạn cần nhập đoạn mã bên dưới để hoàn thành quá trình đăng ký:
            </div>
            <span style="display:block;text-decoration:none;text-align:center;font-size:200%;color:#008;background:#aaf;width:200px;padding:15px;">
                ${verificationCode}
            </span>
            <div style="font-size:120%;line-height:30px;margin:10px 0;">
                Cám ơn bạn vì đã sử dụng dịch vụ của chúng tôi!
                <br/><br/>BlueShark
            </div>
        </div>
    </div>`;
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

function sendResetPasswordEmail(receiver,firstname, verificationCode) {
    mailOptions.to = receiver;
    mailOptions.subject = 'Làm mới mật khẩu tài khoản BlueShark';
    mailOptions.html =  `<div style="width:80%;border:1px solid #444;">
            <div style="height:50px;background:#00d;font-size:200%;text-align:center;color:#fff;line-height:50px;">
                BlueShark
            </div>
            <div style="padding:2%">
                <div style="font-size:120%;line-height:30px;margin:10px 0;">
                    Chào ${firstname},
                    <br/>Gần đây chúng tôi nhận được yêu cầu làm mới mật khẩu tài khoản BlueShark của bạn. Chúng tôi ở đây để giúp bạn!
                    <br/>Đơn giản chỉ cần nhấn vào nút bên dưới để nhận mật khẩu mới:
                </div>
                <a
                    href="${config.DOMAIN_NAME}/resetPassword/${verificationCode}"
                    style="display:block;text-decoration:none;font-size:200%;color:#008;background:#aaf;width:200px;padding:15px;"
                    >
                    Reset password
                </a>
                <div style="font-size:120%;line-height:30px;margin:10px 0;">
                    Cám ơn bạn vì đã sử dụng dịch vụ của chúng tôi!
                    <br/><br/>BlueShark
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
