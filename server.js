var express = require('express')
, app = express()
, server = require('http').createServer(app).listen(4555)
, io = require('socket.io').listen(server)
, bodyParser = require('body-parser')
, cron = require('node-cron')
,request = require('request');;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./'));

var port = process.env.PORT || 8080;
var router = express.Router();


cron.schedule('10,20,30,40,50,59 * * * *', function(){
    consomeApi();    
});

function consomeApi(){
    request('https://api.coinmarketcap.com/v1/ticker/smartcash/', function (error, response, body) {
        if (!error && response.statusCode == 200) {                        
            var json = JSON.parse(body)[0];
            var ret = {"Preco" : json.price_usd, "BTC" : json.price_btc};
            io.emit('notificacao', ret);
         }
    })
};
consomeApi();    

var emitir = function(req, res, next){    
    
}

app.use(emitir);
app.use('/api', router);

router.route('/notificar')
  .get(function(req, res){
  res.json({message: "testando essa rota"})
  })

app.listen(port);