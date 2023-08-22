const express = require("express");
const router = express.Router();
const restaurantesController = require('../controllers/restaurantes.controller');
const { isLoggedIn } = require('../lib/auth');
const fotoRestaurantesController = require('../controllers/fotoRestaurantes.controller');


router.get('/', isLoggedIn, restaurantesController.getListRestaurantes)
router.post('/restaurantes', isLoggedIn,restaurantesController.postRestaurante);
router.get('/add', isLoggedIn, restaurantesController.getAddRestaurantes);
router.get('/list-restaurantes', isLoggedIn,restaurantesController.getListRestaurantes);
router.get('/delete-restaurantes/:id', isLoggedIn,restaurantesController.deleteRestaurante);
router.get('/edit-restaurantes/:id', isLoggedIn,restaurantesController.getRestaurante);
router.post('/edit-restaurantes/:id', isLoggedIn,restaurantesController.updateRestaurante);
 
//views profile

router.post('/foto-restaurante/:id', isLoggedIn, fotoRestaurantesController.updateFoto);



module.exports = router;
