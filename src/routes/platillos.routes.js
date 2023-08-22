const express = require("express");
const router = express.Router();
const platillosController = require('../controllers/platillos.controller');
const { isLoggedIn } = require('../lib/auth');
const fotoPlatillosController = require('../controllers/fotoPlatillos.controller')


router.get('/', isLoggedIn, platillosController.getListPlatillos);
router.post('/platillos', isLoggedIn,platillosController.postPlatillo);
router.get('/add', isLoggedIn, platillosController.getAddPlatillos);
router.get('/list-platillos', isLoggedIn,platillosController.getListPlatillos);
router.get('/delete-platillos/:id', isLoggedIn,platillosController.deletePlatillo);
router.get('/edit-platillos/:id', isLoggedIn,platillosController.getPlatillo);
router.post('/edit-platillos/:id', isLoggedIn,platillosController.updatePlatillo);
 
//views profile

router.post('/foto-platillo/:id', isLoggedIn, fotoPlatillosController.updateFoto);



module.exports = router;
