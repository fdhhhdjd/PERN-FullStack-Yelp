const router = require("express").Router();
const RestaurantCtl = require("../Controllers/RestaurantsCtl");
//Get All
router.get("/getall", RestaurantCtl.GetRestaurant);

//Get Id
router.get("/get/:id", RestaurantCtl.GetIdRestaurantId);

//Create
router.post("/create", RestaurantCtl.CreateRestaurant);

//Edit Id
router.post("/edit/:id", RestaurantCtl.EditRestaurant);

// Delete Id
router.post("/delete/:id", RestaurantCtl.DeleteRestaurant);

//Undo id
router.post("/undo/:id", RestaurantCtl.UndoRestaurant);

module.exports = router;
