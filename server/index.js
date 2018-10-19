var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
//var items = require('../database-mongo');

//EXPRESS SETUP//
var app = express();
app.use(cors());
app.use(express.static(path.join('/home/jpw/HR/hratx37-mvp-starter/react-client/dist/')));

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


//EXPRESS ROUTES//
app.post('/sms', (req, res) => {
  console.log(req.body);
  res.status(200).end();
  
//   const twiml = new MessagingResponse();
// ``
//   twiml.message('The Robots are coming! Head for the hills!');

//   res.writeHead(200, {'Content-Type': 'text/xml'});
//   res.end(twiml.toString());
});

// app.get('/items', function (req, res) {
//   items.selectAll(function(err, data) {
//     if(err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
// });

app.get('*', (req,res)=>{
  //console.log(req.body);
  //res.send('HI');
  res.sendFile(path.join('/home/jpw/HR/hratx37-mvp-starter/react-client/dist/index.html'))
});

// UNCOMMENT FOR REACT
// app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));



app.listen(3000, function() {
  console.log('listening on port 3000!');
});

