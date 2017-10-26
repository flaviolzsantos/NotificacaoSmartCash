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
    request('https://bravenewcoin.com/api/v2/d1/smart/smart_index_summary_d1.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {            
            var ret = JSON.parse(body);
            io.emit('notificacao', ret.gwa);
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