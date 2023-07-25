const express=require('express')
const route=express.Router()
const clientModel=require('../models/client.model')
const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config()



var privateKey=process.env.PRIVATE_KEY
verifyToken=(req,res,next)=>{
    let Token=req.headers.authorization
    if (!Token){
        res.status(400).json({msg:'acces rejected...!!!!!'})
    }
    try{
        verif=jsonwebtoken.verify(Token,privateKey)
        next()
    }catch(e){
        res.status(400).json({msg:e})   
    }
}


var secretKey=process.env.SECRET_KEY
var clientKey=process.env.CLIENT_KEY
verifySecretClient=(req,res,next)=>{
    let sk=req.params.secretKey
    let ck=req.params.clientKey
    if(sk==secretKey && ck==clientKey){
        next()
    }else{
        res.status(400).jon({error:"you can't acces"})
    }
}



route.post('/addClient',(req,res,next)=>{
    clientModel.saveNewClient (req.body.FirstName,req.body.LastName,req.body.password,req.body.Email,req.body.Adress,req.body.Phone)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
})


route.get('/allClients',verifyToken,(req,res,next)=>{
    let Token=req.headers.authorizarition
    let user=jsonwebtoken.decode(Token,{complete:true})
    clientModel.getAllClient()
    .then((doc)=>res.status(200).json({Client:doc,user:user}))
    .catch((err)=>res.status(400).json(err))
})


route.get('/client/:id',(req,res,next)=>{
    clientModel.getOneClient(req.params.id)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
})



route.delete('/client/:id',(req,res,next)=>{
    clientModel.deleteOneClient(req.params.id)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
})


route.patch('/client/:id',(req,res,next)=>{
    clientModel.updateOneClient(req.params.id,req.body.FirstName,req.body.LastName,req.body.Email,req.body.Adress,req.body.Phone)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
})




module.exports=route