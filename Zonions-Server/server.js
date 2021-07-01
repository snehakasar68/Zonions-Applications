const express=require("express")
const mongoose=require("mongoose")
const passport=require("passport")
const db=require("./Config/database.config")
const app=express();
const cors=require("cors")

var corsOptions={
    origin:"http://localhost:3000"
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//connection with mongodb
mongoose.connect(db.dburl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("Connected with database..!!");
})
.catch((error)=>{
    console.log(error);
})

app.use(passport.initialize());
require("./Config/passport")(passport)

//import login route
const adminRoute=require("./Routes/admin-routes")
app.use("/restaurant",adminRoute)

//import created routes of restaurant
const restaurantRoute=require("./Routes/restaurant-routes")
app.use("/restaurant",restaurantRoute)



//server
app.listen(8000,()=>{
    console.log("server started on port 8000");
})