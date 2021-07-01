const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const db=require("../Config/database.config")
const Admin=require("../Models/admin-register-model")


exports.adminRegistration=(req,res)=>{
    const newAdmin=new Admin({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        username:req.body.username,
        password:req.body.password
    })
    bcrypt.genSalt(10,(err,salt)=>{
        if(err) throw err
        bcrypt.hash(newAdmin.password,salt,(err,hash)=>{
            if(err) throw err
            newAdmin.password=hash
            newAdmin.save().then(admin=>{
                    res.send(admin)
            })
            .catch(err=>{
                console.log(err);
            })
        })
    })
}
//admin authentication
exports.adminLogin=(req,res)=>{
    const username=req.body.username
    const password=req.body.password
    
        Admin.findOne({username}).then(admin=>{
            if(!admin){
                return res.status(500).send({Username:"User name not found"})
            }
            
            bcrypt.compare(password,admin.password).then(isMatch=>{
                if(isMatch){
                    const payload={
                        id:admin.id,
                        firstname:admin.firstname
                    }
                    //jwt token creation
                    jwt.sign(
                        payload,db.secretKey,{expiresIn:31556926},
                        (err,token)=>{
                            if(err) res.send(err);
                            res.json({
                                success:true,
                                token:"Bearer "+token,
                                username:admin.username
                                
                            })
                        }
                    )
                }
                else{
                    return res.status(500).send({password:"password incorrect"})
                }
            })
        })
}