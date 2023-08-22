const express = require("express");
const router = express.Router();
const dueñosController = require('../controllers/dueños.controller');
const { isLoggedIn } = require('../lib/auth');
const fotoDueñosController = require('../controllers/fotoDueños.controller')


router.get('/', isLoggedIn, dueñosController.getListDueños);
router.post('/dueños', isLoggedIn,dueñosController.postDueño);
router.get('/add', isLoggedIn, dueñosController.getAddDueños);
router.get('/list-dueños', isLoggedIn,dueñosController.getListDueños);
router.get('/delete-dueños/:id', isLoggedIn,dueñosController.deleteDueño);
router.get('/edit-dueños/:id', isLoggedIn,dueñosController.getDueño);
router.post('/edit-dueños/:id', isLoggedIn,dueñosController.updateDueño);
 
//views profile

router.post('/foto-dueño/:id', isLoggedIn, fotoDueñosController.updateFoto);



module.exports = router;
