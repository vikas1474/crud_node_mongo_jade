var express =require('express');
import bodyParser from 'body-parser';
import router from './index';
import path from 'path';
var expressValidator  = require('express-validator');
var expressSession = require('express-session');

const app=express();

app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'pug')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))
app.use(expressValidator());
app.use(expressSession({secret:'max',saveUninitialized:false,resave:false}));
app.use(router);


app.listen('8000', ()=>{
    
});