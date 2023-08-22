const express = require("express");
const router = express.Router();
const dulcesController = require('../controllers/dulces.contoller');
const { isLoggedIn } = require('../lib/auth');
const fotoDulcesController = require('../controllers/fotoDulces.controller');


router.get('/', isLoggedIn, dulcesController.getListDulces);
router.post('/dulces', isLoggedIn,dulcesController.postDulce);
router.get('/add', isLoggedIn, dulcesController.getAddDulces);
router.get('/list-dulces', isLoggedIn,dulcesController.getListDulces);
router.get('/delete-dulces/:id', isLoggedIn,dulcesController.deleteDulce);
router.get('/edit-dulces/:id', isLoggedIn,dulcesController.getDulce);
router.post('/edit-dulces/:id', isLoggedIn,dulcesController.updateDulce);
 
//views profile

router.post('/foto-dulce/:id', isLoggedIn, fotoDulcesController.updateFoto);



module.exports = router;
