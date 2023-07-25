const express=require("express")
const route=express.Router()
const routeModel=require('../models/authentification.model')




route.post('/login',(req,res,next)=>{
    routeModel.login(req.body.UserEmail,req.body.UserPassword)
    .then((token)=>res.status(200).json({token:token}))
    .catch((err)=>res.status(400).json({error:err}))
})


route.post('/register',(req,res,next)=>{
    routeModel.register(req.body.UserFirstName,req.body.UserEmail,req.body.UserPassword)
    .then((user)=>res.status(200).json({user:user,msg:"added !!"}))
    .catch((err)=>res.status(400).json({error:err}))
})
