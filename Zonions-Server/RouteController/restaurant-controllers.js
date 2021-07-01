const restaurant=require("../Models/restaurant-model")

//handler of post restaurant request
exports.createRestaurant=(req,res)=>{
    const newRestaurantDetail=new restaurant({
        rname:req.body.rname,
        address:req.body.address,
        phone:req.body.phone,
        opentime:req.body.opentime,
        closetime:req.body.closetime,
        menu:req.body.menu,
        
    })
    newRestaurantDetail.save()
    .then((data)=>{
        res.send(data)
    })
    .catch((error)=>{
        res.status(500).send({message:error.message || "Some error occurred while retriving "})
    })

}

//handler of get restaurant request
exports.getAllRestaurant=(req,res)=>{
restaurant.find()
.then(data=>{
    res.send(data)
})
.catch(error=>{
    res.status(500).send({
        message:error.message || "Some error occurred while retriving"
    })
})
}

//handler of get specific restaurant request
exports.getOneRestaurant=(req,res)=>{
    const id=req.params.id;
    restaurant.findById(id)
    .then(data=>{
        res.send(data)
    })
    .catch(error=>{
        res.status(500).send({message:"Error..!! while retrieving data"});
    })

}

//handler of put/update restaurant request
exports.updateRestauran=(req,res)=>{
const id=req.params.id
restaurant.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
.then(data=>{
    res.send("Updated successfully..!! "+data)
})
.catch(error=>{
    res.status(500).send({message:error || "Error while updating"})
})
}

//handler of delete restaurant request
exports.deleteRestaurant=(req,res)=>{
const id=req.params.id
restaurant.findByIdAndDelete(id,{useFindAndModify:false})
.then(data=>{
    res.send("Deleted successfully..!!")
})
.catch(error=>{
    res.status(500).send({
        message:error
    })
})
}

