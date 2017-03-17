var express  = require('express');
var app = express();
app.set('view engine','ejs');
app.set('views','views');
app.use(express.static('public'));
var bodyParser = require('body-parser');
var parser = bodyParser.json();

var config = require('./config.js');
var { getProducts, bid } = require('./model/product-manager.js');

var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(config.PORT, () => {
    console.log('Server is running');
    Object.keys(config).forEach(function (key) {
        console.log(key + ' : ' + config[key]);
    });
});

app.post('/register', parser, require('./controller/register.js'));
app.post('/login', parser, require('./controller/login.js'));
app.post('/user', parser, require('./controller/user.js'));
app.post('/forgotPassword/', parser, require('./controller/forgotpassword.js').requestResetPassword);
app.get('/resetPassword/:verificationCode', require('./controller/resetpassword.js'));
app.get('/products', (req,res) => res.render('home',{ products: getProducts() }));

setInterval(() => io.emit('SERVER_SEND_HOME', getProducts()),1000);
io.on('connection', socket => {
    console.log("a user connected as: " + socket.id);
    socket.emit('SERVER_SEND_HOME', getProducts());
    socket.on('CLIEN_SEND_BID', data => require('./controller/io.client-send-bid.js')(socket,data));
    socket.on('CLIENT_POST_PRODUCT', data => require('./controller/io.client-post-product.js')(socket,data));
});
