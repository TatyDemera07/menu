const express = require("express");
const router = express.Router();
const porcionesController = require('../controllers/porciones.controller');
const { isLoggedIn } = require('../lib/auth');
const fotoPorcionesController = require('../controllers/fotoPorciones.controller')


router.get('/', isLoggedIn, porcionesController.getListPorciones);
router.post('/porciones', isLoggedIn,porcionesController.postPorcion);
router.get('/add', isLoggedIn, porcionesController.getAddPorciones);
router.get('/list-porciones', isLoggedIn,porcionesController.getListPorciones);
router.get('/delete-porciones/:id', isLoggedIn,porcionesController.deletePorcion);
router.get('/edit-porciones/:id', isLoggedIn,porcionesController.getPorcion);
router.post('/edit-porciones/:id', isLoggedIn,porcionesController.updatePorcion);
 
//views profile


router.post('/foto-porcion/:id', isLoggedIn, fotoPorcionesController.updateFoto);



module.exports = router;
