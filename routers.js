 const express=require('express');
 const joy=require('joi');
 const app=express();
 const router=express.Router();
 const bodyParser=require('body-parser');
//  router.use(joy('dev'))
 //I imported my schema
 const Utilisers = require('../model/utilizers');
 const path=require('path');
const fs= require('fs');
router.use(bodyParser.urlencoded({extended:false}));
 router.get('/',(req,res)=>{
  fs.createReadStream(path.join(__dirname,"index.html")).pipe(res);
 });
//let me find in database
 router.get('/find',findUsers, (req,res)=>{
  
    try{
res.send(res.forma.firstname +"\n"+ res.forma.lastname +"\n"+ res.forma.email)

    }catch(error){
        res.status(500).json({message:error.message});
    }
 })

//let me save data from the form
 router.post("/create", async(req, res,next) => {
  const newUser = await Utilisers.create({
    firstname: req.body.firstname,
    lastname:req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    lastname:req.body.lastname
  })
  await newUser.save();
  res.redirect("/log");
  if(newUser) {
    console.log("saved");
  } else {
    res.send('The user was not added to database')
    console.log("Not saved")
  }
 });

 //let me validate the user

 router.get('/log',(req,res)=>{
  res.sendFile(path.join(__dirname,"log.html"))
})

 router.post("/log",searchUsers, (req,res)=>{
try{ 
 res.send(res.edd.firstname + " " +  res.edd.lastname + "\n " +"welcome to our the site of happiness");
}catch(error){
  res.status(400).json({message:error})
}
 })

 //let me update user
 router.get('/update',(req,res)=>{
  res.sendFile(path.join(__dirname,"update.html"));
 })
 router.post('/update',async (req,res)=>{
  
    const newUser = await Utilisers.findOneAndUpdate(
      {password:req.body.password},{$set:{
      firstname: req.body.firstname,
      lastname:req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      lastname:req.body.lastname
      }
  })
res.newUser=newUser
try{
  if(newUser){
    res.status(200).json('OK The user '+' ' + res.newUser.firstname+ ' '+ 'was updated successfully');
    }
    else{
      res.send("This password and email is not found on our system");
    }
  }
catch(error){
  res.status(400).json('The user ' + res.newUser.firstname + 'was not updated successfully');
  console.log(error);
}
 });

 //let me delete
 router.get('/delete',(req,res)=>{
  res.sendFile(path.join(__dirname,"delete.html"));
 })
 router.post('/delete',async (req,res)=>{
// password:req.body.password,
//    email:req.body.email;
//   const name=req.body.firstname;
  const remove= await Utilisers.findOneAndDelete({email:req.body.email,password:req.body.password});
  res.remove=remove;
  try{
    if(remove!=null){
res.status(200).json('One user'+' ' +res.remove.firstname +' '+'was deleted successfull')
    }
  }catch(error){
    res.status(400).json({message:'The user'+' '+name + ' ' + 'is not found or something went wrong'});
  }
 })

 //function to delete by Id
async function getUsers(req,res,next){
  let user
  try{
  user= await Utilisers.findById(req.params.id)
  if(user==null){
   return res.status(404).json('The user with this id is not found on our system');
  }
  }catch(error){
   return res.status(404).json({mesage:'error'});
    console.log(error);
  }
  res.user=user;
   next();
}

 // function to find user by email
async function findUsers(req,res,next){
  let forma
  let ema=req.body.email
  try{
  forma= await Utilisers.findOne({email:req.body.email})
  if(forma==null){
   return res.status(404).json('The user with this email  is not found on our system');
  }
  }catch(error){
   return res.status(404).json({mesage:'error'});
    console.log(error);
  }
  res.forma=forma;
   next();
};

//find user by using function
async function searchUsers(req,res,next){
  let edd
  let ema=req.body.email
  try{
  edd=await Utilisers.findOne({email:req.body.email})
  if(edd==null){
   return res.status(404).json('Invalid email or password');
  }
  }catch(error){
   return res.status(404).json({mesage:'error'});
    console.log(error);
  }
  res.edd=edd;
   next();
};
// I exported my routers
 module.exports=router;
