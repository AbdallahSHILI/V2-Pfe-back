const express=require("express")
const clientRoute=require("./routers/client.route")
const userRoute=require("./routers/admin.route")
const app=express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use((req,res,next)=>{
    res.setHeader('Acces-Contril-Allow-Origin',"*")
    res.setHeader('Acces-Contril-Request-Methode',"*")
    res.setHeader('Acces-Contril-Allow-Headers',"authorization")
    next()
})
app.use("/",userRoute)
app.use("/",clientRoute)




app.listen(3000,()=>console.log('server run !!'))