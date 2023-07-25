const mongoose=require('mongoose')
const Joi = require('joi')
require('dotenv').config()




const schemaValidation=Joi.object({
    First_N:Joi.string().alphanum().min(2).max(20).required(),
    Last_N:Joi.string().alphanum().min(2).max(20).required(),
    Email:Joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}),
    addrs:Joi.string().alphanum().min(2).max(20).required(),
    Phone_number:Joi.string().alphanum().min(8).required()

})



let schemaClient=mongoose.Schema({
    Email:String,
    password:String,
    FirstName:String,
    LastName:String,
    Adress:String,
    Phone_Number:Number,
})

var Client=mongoose.model('client',schemaClient)



var url=process.env.URL


exports.saveNewClient=(FirstName,LastName,Email,password,Adress,Phone)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{    
            let validation=schemaValidation.validate(
                {
                    Email:Email,
                    First_N:FirstName,
                    Last_N:LastName,
                    password:password,
                    addrs:Adress,
                    Phone_number:Phone
                }
            )
            if(validation.error){
                mongoose.disconnect()
                reject(validation.error.details[0].message)
            }
            let client=new Client({
                FirstName:FirstName,
                LastName:LastName,
                Email:Email,
                password:password,
                Adress:Adress,
                Phone:Phone
            })
            client.save().then((doc)=>{
                mongoose.disconnect()
                resolve(doc)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            }).catch((err)=>reject(err))
        })
    })
}


exports.getAllClient=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Client.find()
            }).then((doc)=>{
                mongoose.disconnect()
                resolve(doc)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
    })
})
}



exports.getOneClient=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Client.findById(id)
            }).then((doc)=>{
                mongoose.disconnect()
                resolve(doc)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
    })
})
}




exports.deleteOneClient=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Client.deleteOne({_id:id})
            }).then((doc)=>{
                mongoose.disconnect()
                resolve(doc)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
    })
})
}



exports.updateOneClient=(id,FirstName,LastName,Email,Adress,Phone)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Client.updateOne({_id:id},{FirstName:FirstName,LastName:LastName,Email:Email,Adress:Adress,Phone:Phone})
            }).then((doc)=>{
                mongoose.disconnect()
                resolve(doc)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
    })
})
}


