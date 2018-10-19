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
  smsMessage: String
});

var Text = mongoose.model('Text', textSchema);

let selectAll = function(callback) {
  Item.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

let insertMessage = (message, callback) => {
  const newMessage = {
    phoneNumber: message.phoneNumber.toString(),
    smsMessage: message.smsMessage,
  }

  let insertMessage = new Text(newMessage);

  insertMessage.save((err, data) => {
    if (err){
      throw err;
    }else {
      console.log("Inside the database here is the data: ", data)
      callback(data);
      db.close();
    }
  })
} 

module.exports.selectAll = selectAll;
module.exports.insertMessage = insertMessage;