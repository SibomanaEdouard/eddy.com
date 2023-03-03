require('dotenv').config();
const mongo=require('mongoose');
 const Users=require('./users');
const express=require('express');
const logger=require('morgan');
const app=express();
const router = require('./subs/routers')
// const auth=require('./auths/auth');
const cor=require('Cors');
const bcrypt=require('bcrypt');
const bodyParser=require('body-parser');
// app.use('/auth',auth);
app.use(logger('dev'))
app.use(cor());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

mongo.set('strictQuery',true);
mongo.connect(process.env.MONGO_UR,()=>{
    console.log('connected');
    
});

const json=require('json');
const datab=mongo.connection;
datab.on('error',(error)=>console.error(error))
datab.once('open',()=>console.log("It is opened"))

app.use(express.json());
 const subrouter=require("./subs/routers");
 app.use('/routers',subrouter)

 app.use('/', router)
  
app.listen(3000,(error)=>{
    if(error) throw error;
    console.log('connected on the sever');
}) 
