
var express     = require('express'),
    app         = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendfile('index.html');
});

app.listen(3000, '127.0.0.1', function() {

});

