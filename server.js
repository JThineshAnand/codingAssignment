var app = require('./backend/app');

port = process.env.PORT || 3000;


app.listen(port,function(){
 console.log(`Server is listening at ${port}`);
});
