var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var UserSchema = Schema({
  name: {type:String, required:true},
  email: {type:String, required:true, unique: true},
  password: {type:String, required:true}
});

UserSchema.pre('save',function(next){
  var user = this;
  if(!user.isModified('password')) return next();
  bcrypt.genSalt(10,function(err,salt){
    if(err) return next(err);
    bcrypt.hash(user.password,salt,null,function(err,hash){
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password,this.password);
};

UserSchema.plugin(uniqueValidator);



var User = mongoose.model('User',UserSchema);
module.exports = User;
