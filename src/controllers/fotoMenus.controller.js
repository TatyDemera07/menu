const pool = require("../config/database");
const menus = require("../models/menu.model");
const { isLoggedIn } = require('../lib/auth');

const fotoMenu = {};

fotoMenu.updateFoto = async (req, res) => {
    const { id } = req.params;
    let sampleFile;
    let uploadPath;

    if(!req.files || Object.keys(req.files).length === 0 ) {
        req.flash('message', 'No ingresas el menu')
        return res.status(400).redirect('/menus');
    }
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/../public/images/img-menu/' + sampleFile.name;

    console.log(sampleFile);

    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
        pool.query('UPDATE menus SET photo = ? WHERE id = ?', [sampleFile.name, id])
        req.flash('success', 'menu actualizado');
        res.redirect('/menus');

    });

};
module.exports = fotoMenu