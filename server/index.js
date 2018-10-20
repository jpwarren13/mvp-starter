var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const keys = require('../config');
const client = require('twilio')(keys.accountSid, keys.authToken);
const db = require('../database-mongo/index');


const MessagingResponse = require('twilio').twiml.MessagingResponse;

// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
//var items = require('../database-mongo');

//EXPRESS SETUP//
var app = express();
app.use(cors());
app.use(express.static(path.join('/home/jpw/code/hratx37-mvp-starter/react-client/dist/')));

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


//EXPRESS ROUTES/
app.post('/smsout', (req, res) => {
  let rawNumber = req.body.phoneNumber.replace(/[^0-9]/g, '');
  let phoneNumber = '+1' + rawNumber;
  let smsMessage = req.body.smsMessage;
  let outgoing = true;

  console.log(req.body);
  client.messages.create({
    body: smsMessage,
    from: '+18052259359',
    to: phoneNumber,
  }).then(message => {
    //save to database
    //console.log('message sent: ', message);
    db.insertMessage({phoneNumber, smsMessage, outgoing}, () => {
      res.status(201).end();
    })
    //console.log(message);

  });
  
//   const twiml = new MessagingResponse();
// ``
//   twiml.message('The Robots are coming! Head for the hills!');

//   res.writeHead(200, {'Content-Type': 'text/xml'});
//   res.end(twiml.toString());
});

app.post('/smsin', (req, res) => {
//console.log('##### SMS IN', req.body)
  let phoneNumber = req.body.From;
  let smsMessage = req.body.Body;
  let outgoing = false;


  console.log('[SERVER] Phone number and smsMessage coming in!!', phoneNumber, smsMessage);

  // const incomingMessage = {
  //   phoneNumber: phoneNumber,
  //   smsMessage: smsMessage,
  //   outgoing: false,
  // }

  db.insertMessage({phoneNumber, smsMessage, outgoing}, () => {
    res.status(201).end();
  })

  // const twiml = new MessagingResponse();

  // twiml.message('The Robots are coming! Head for the hills!');

});


app.get('/recieveTexts', function (req, res) {
  console.log("asking for texts!");
  db.selectAll((err, texts) => {
    console.log("[SERVER] received texts from database on server", texts);
    res.status(200).send(texts);
  })
  //db.selectAll();
});

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

