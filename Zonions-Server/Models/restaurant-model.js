const mongoose=require("mongoose")

const restaurantSchema=new mongoose.Schema({
    rname:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    opentime:{
        type:String,
        required:true
    },
    closetime:{
        type:String,
        required:true
    },
    menu:{
        type:String,
        required:true
    },
    activeStatus:{
        type:Boolean,
        default:false
    }
},
{ timestamps: true }
)

module.exports=mongoose.model("restaurant",restaurantSchema)