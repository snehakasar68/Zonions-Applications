const controller=require("../RouteController/restaurant-controllers")
const router=require("express").Router()

//retrieve all restaurant
router.get("/",controller.getAllRestaurant)

//retrieve specific restaurant
router.get("/:id",controller.getOneRestaurant)

//post restaurant to database
router.post("/",controller.createRestaurant)

//delete a specific restaurant
router.delete("/:id",controller.deleteRestaurant)

//update a specific restaurant
router.put("/:id",controller.updateRestauran)


module.exports=router