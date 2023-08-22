const express = require("express");
const router = express.Router();
const menusController = require('../controllers/menus.controller');
const { isLoggedIn } = require('../lib/auth');
const fotoMenusController = require('../controllers/fotoMenus.controller')


router.get('/', isLoggedIn, menusController.getListMenus);
router.post('/menus', isLoggedIn,menusController.postMenu);
router.get('/add', isLoggedIn, menusController.getAddMenus);
router.get('/list-menus', isLoggedIn,menusController.getListMenus);
router.get('/delete-menus/:id', isLoggedIn,menusController.deleteMenu);
router.get('/edit-menus/:id', isLoggedIn,menusController.getMenu);
router.post('/edit-menus/:id', isLoggedIn,menusController.updateMenu);
 
//views profile

router.post('/foto-menu/:id', isLoggedIn, fotoMenusController.updateFoto);



module.exports = router;
