const express = require('express');
const app = express();



//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

//routes
app.use(require('./routes/routes'));
app.listen(3000,()=> console.log('Server started on port 3000 - Ejercicios '));