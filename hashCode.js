const fs = require('fs');
var rString = 'KJE4ZMQTBW8XU7L3Y26DSAIFPG19NHR50OCV';
function hashCode() {
    return new Promise(function(resolve, reject) {
        fs.readFile('./data.json', (err,data) => {
            if (err) reject(err);
            else {
                var data = JSON.parse(data);
                var code = data.code;
                var pos = Math.floor(Math.random()*code.length);
                code[pos] = (code[pos] + Math.floor(Math.random()*2) + 1) % rString.length;
                var randomCode = '';
                code.forEach(e => randomCode += rString[e]);
                data.code = code;
                fs.writeFile('./data.json', JSON.stringify(data), err => {
                    if (err) reject(err);
                    else {
                        console.log('Hash code: ' + randomCode);
                        resolve(randomCode);
                    }
                });
            }
        });
    });
}
module.exports = {hashCode};
