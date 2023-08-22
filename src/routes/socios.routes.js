const express = require("express");
const router = express.Router();
const sociosController = require('../controllers/socios.controller');
const { isLoggedIn } = require('../lib/auth');
const fotoSociosController = require('../controllers/fotoSocios.controller')


router.get('/', isLoggedIn, sociosController.getListSocios);
router.post('/socios', isLoggedIn,sociosController.postSocio);
router.get('/add', isLoggedIn, sociosController.getAddSocios);
router.get('/list-socios', isLoggedIn,sociosController.getListSocios);
router.get('/delete-socios/:id', isLoggedIn,sociosController.deleteSocio);
router.get('/edit-socios/:id', isLoggedIn,sociosController.getSocio);
router.post('/edit-socios/:id', isLoggedIn,sociosController.updateSocio);
 
//views profile

router.post('/foto-socio/:id', isLoggedIn, fotoSociosController.updateFoto);



module.exports = router;
