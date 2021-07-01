const router=require("express").Router()
const controller=require("../RouteController/admin-controller")

//admin login route
router.post("/login",controller.adminLogin)

//admin register
router.post("/register",controller.adminRegistration)

module.exports=router