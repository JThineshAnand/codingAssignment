var express = require('express');
var cors = require('cors');
var mongoose = require('./mongoose');
var User = require('./models/user');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var checkAuth = require('./middleware/check-auth');

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/signup',(req,res,next)=>{

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var user = new User({
      name,email,password
    });

    console.log(user);

    user.save().then((user)=>{
      console.log('User created');
      res.json(user);
    }).catch((err)=>{
      console.log('Error in saving user');
      res.json(err);
    });
});


app.post('/api/login',(req,res,next)=>{

  User.findOne({email:req.body.email})
    .then(user=>{
      if(!user){

        return res.status(401).json({
          message:'User Email does not exist'
        });
      }
      if(!user.comparePassword(req.body.password)){

        return res.status(401).json({
          message:'Invalid Password'
        });
      }

      var token = jwt.sign({
        email:user.email,userId: user._id
      },"secret123",{expiresIn:"1h"});

      res.status(200).json({
        token:token
      });
    });
});

app.get('/api/users',checkAuth,(req,res,next)=>{
  User.find().then((users)=>{
    var permittedUserValues = users.map(function(user){
      return {
        name: user.name,
        email:user.email
      }
    });

    res.json(permittedUserValues);
  }).catch((err)=>{
    res.json({message: 'Error in getting Registered Users'});
  });
});


module.exports = app;
