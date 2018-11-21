var mongoose = require('mongoose');
var config = require('./config');


mongoose.connect(config.mongoURI,{ useNewUrlParser: true }).then((db)=>{
  console.log('DB Connected');
}).catch((err)=>{
  console.log('Error in Connecting to DB');
});


module.exports = mongoose;
