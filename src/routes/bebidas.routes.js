const express = require("express");
const router = express.Router();
const bebidasController = require('../controllers/bebidas.controller');
const { isLoggedIn } = require('../lib/auth');
const fotoBebidasController = require('../controllers/fotoBebidas.controller')


router.get('/', isLoggedIn, bebidasController.getListBebidas);
router.post('/bebidas', isLoggedIn,bebidasController.postBebida);
router.get('/add', isLoggedIn, bebidasController.getAddBebidas);
router.get('/list-bebidas', isLoggedIn,bebidasController.getListBebidas);
router.get('/delete-bebidas/:id', isLoggedIn,bebidasController.deleteBebida);
router.get('/edit-bebidas/:id', isLoggedIn,bebidasController.getBebida);
router.post('/edit-bebidas/:id', isLoggedIn,bebidasController.updateBebida);

 
//views profile
router.post('/foto-bebida/:id', isLoggedIn, fotoBebidasController.updateFoto);




module.exports = router;
