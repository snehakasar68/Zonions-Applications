const JwtStrategy=require("passport-jwt").Strategy
const ExtractJwt=require("passport-jwt").ExtractJwt
const Admin=require("../Models/admin-register-model")
const db=require("./database.config")

const options={};
options.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey=db.secretKey

module.exports=passport=>{
    passport.use(
        new JwtStrategy(options,(jwt_payload,done)=>{
            Admin.findById(jwt_payload.id).then(admin=>{
                if(admin){
                return done(null,admin)}
                return done(null,false)
            })
            .catch(err=>{console.log(err);})
        })
    )
}