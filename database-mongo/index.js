var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var textSchema = mongoose.Schema({
  phoneNumber: String,
  smsMessage: String,
  outgoing: Boolean,
});

var Text = mongoose.model('Text', textSchema);

let selectAll = function(callback) {
  Text.find({}, function(err, texts) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, texts);
    }
  });
};

let insertMessage = (message, callback) => {
  console.log('[DATABASE] trying to save to database', message);
  const newMessage = {
    phoneNumber: message.phoneNumber.toString(),
    smsMessage: message.smsMessage,
    outgoing: message.outgoing,
  }

  const mess = new Text(newMessage);

  // db.Text.insert(newMessage, (err, data)=> {
  //   if (err){
  //     throw err;
  //   }else {
  //     console.log("[DATABASE] Inside the database here is the data: ", data)
  //     callback(data);
  //     db.close();
  //   }
  // })
  mess.save((err, data)=> {
  if (err){
    throw err;
  }else {
    console.log("[DATABASE] Inside the database here is the data: ", data)
    callback(data);
    //db.close();
  }
})

} 

module.exports.selectAll = selectAll;
module.exports.insertMessage = insertMessage;