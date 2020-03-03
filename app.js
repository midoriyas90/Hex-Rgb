const express = require('express');
const hbs   = require("express-handlebars");
const path  = require ("path");
const index = require('./routes/index.js');
const bodyParser = require('body-parser');

var app = express();
const publicPath = path.join(__dirname,"public");
const port = process.env.PORT || 2000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.engine('handlebars',hbs());
app.set('view engine','handlebars');
app.use(express.static(publicPath));
app.use('/',index);

app.listen(port,()=>{
    console.log('server is runnig');
});