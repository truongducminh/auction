var express  = require('express');
var app = express();
app.set('view engine','ejs');
app.set('views','views');
app.use(express.static('public'));
var moment = require('moment');

var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(3000, () => {
    console.log('Server is running');
});
app.get('/products', (req,res) => {
    // res.send(JSON.stringify(products));
    res.render('home',{products});
});

var products = [];
var durations = [];
for (var i = 0; i < 3; i++) {
    var id = i>9?i:('0'+i);
    var randomPrice = (Math.floor(Math.random()*20)+1)*5 + '.000 VND';
    var randomDuration = Math.floor(Math.random()*10000);
    var randomImage = Math.floor(Math.random()*3);
    products.push({
        id: id,
        image: 'https://store.storeimages.cdn-apple.com/4974/as-images.apple.com/is/image/AppleInc/aos/published/images/m/ac/macbook/select/macbook-select-gold-201604?wid=470&hei=556&fmt=png-alpha&qlt=95&.v=1473974022369',
        name: 'Macbook',
        postdate: moment().format('DD/MM/YYYY HH:mm'),
        expire: moment().add(randomDuration).format('DD/MM/YYYY HH:mm'),
        price: randomPrice
    });
    durations.push({ id: id, duration: randomDuration });
}
products.sort((a,b) => a.duration - b.duration);

var timeleftFormat = (duration) => {
    var hours   = (duration - duration % 3600) / 3600;
    duration    = duration % 3600;
    var minutes = (duration - duration % 60) / 60;
    var seconds = duration % 60;
    return hours + ':' + (minutes>9?minutes:('0'+minutes)) + ':' + (seconds>9?seconds:('0'+seconds));
};

setInterval(() => {
    var timeleftArray = [];
    for (var i = durations.length - 1; i >= 0; i--) {
        duration = durations[i];
        if (duration.duration > 0) {
            duration.duration--;
            products[i].timeleft = timeleftFormat(duration.duration);
        }
        else {
            durations.splice(i,1);
            products.splice(i,1);
        }
    }
    io.emit('SERVER_SEND_HOME', products);
},1000);

io.on('connection', socket => {
    socket.emit('SERVER_SEND_HOME', products);
    socket.on('CLIENT_SEND_ID', data => {
        console.log(data);
        setInterval(() => {
            var timeleft;
            product = products.find(e => e.id == id);
            socket.emit('SERVER_SEND_PRODUCT', product.timeleft);
        },1000);
    });
    console.log('a user connected');
});
