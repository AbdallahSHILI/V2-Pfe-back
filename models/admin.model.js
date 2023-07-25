const mongoose=require('mongoose')
const bcrypt=require("bcrypt")
const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config()





let schemaUser=mongoose.Schema({
    UserFirstName:String,
    UserEmail:String,
    UserPassword:String,
})




var User=mongoose.model('user',schemaUser)



var url=process.env.URL




exports.register=(UserFirstName,UserEmail,UserPassword)=>{
    return new Promise ((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return User.findOne({UserEmail:UserEmail})
        }).then((doc)=>{
            if(doc){
                mongoose.disconnect()
                reject("Email Exist")
            }else{
                bcrypt.hash(UserPassword,10).then((hashUserPassword)=>{
                    let user=new User({
                        UserFirstName:UserFirstName,
                        UserEmail:UserEmail,
                        UserPassword:hashUserPassword,
                    })
                    user.save().then((user)=>{
                        mongoose.disconnect()
                        resolve(user)
                    }).catch((err)=>{
                        mongoose.disconnect()
                        reject(err)
                    })
                }).catch((err)=>{
                    mongoose.disconnect()
                    reject(err)
                })
            }
        })
    })
}


var privateKey=process.env.PRIVATE_KEY




exports.login=(UserEmail,UserPassword)=>{
    return new Promise ((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return User.findOne({UserEmail:UserEmail})
        }).then((user)=>{
            if(!user){
                mongoose.disconnect()
                reject("Email and Password Invalid")
            }else{
                bcrypt.compare(UserPassword,user.UserPassword).then((same)=>{
                    if(same){
                        let token=jsonwebtoken.sign(
                            {id:user._id,UserFirstName:user.UserFirstName},
                            privateKey,
                            {expiresIn:"1d"}
                        )
                        mongoose.disconnect()
                        resolve(token)
                    }else{
                        mongoose.disconnect()
                        reject("Email and Password Invalid")
                    }
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        }
    })
})
}