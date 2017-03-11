var express  = require('express');
var app = express();
app.set('view engine','ejs');
app.set('views','views');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(3000, () => {
    console.log('Server is running');
});

app.post('/register', require('./controller/register.js'));
app.post('/forgotpassword', require('./controller/forgotpassword.js'));


io.on('connection', socket => {
    console.log('A client has connected');
});
