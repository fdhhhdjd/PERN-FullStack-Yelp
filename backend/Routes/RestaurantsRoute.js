const router = require("express").Router();
const RestaurantCtl = require("../Controllers/RestaurantsCtl");
const DeleteCacheCtl = require("../Controllers/DeleteCache");
//Get All
router.get("/getall", RestaurantCtl.GetRestaurant);

//Get All Delete
router.get("/getdelete", RestaurantCtl.GetRestaurantDelete);

//Get Id
router.get("/get/:id", RestaurantCtl.GetIdRestaurantId);

//Create
router.post("/create", RestaurantCtl.CreateRestaurant);

//Edit Id
router.post("/edit/:id", RestaurantCtl.EditRestaurant);

// Delete Id
router.post("/delete", RestaurantCtl.DeleteRestaurant);

//Undo id
router.post("/undo", RestaurantCtl.UndoRestaurant);

//DeleteCache
router.post("/cache", DeleteCacheCtl.deleteCacheRedis);

module.exports = router;
