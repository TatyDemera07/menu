const pool = require("../config/database");
const platillos = require("../models/platillo.model");
const { isLoggedIn } = require('../lib/auth');

const fotoPlatillo = {};

fotoPlatillo.updateFoto = async (req, res) => {
    const { id } = req.params;
    let sampleFile;
    let uploadPath;

    if(!req.files || Object.keys(req.files).length === 0 ) {
        req.flash('message', 'No ingresas el platillo')
        return res.status(400).redirect('/platillos');
    }
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/../public/images/img-platillos/' + sampleFile.name;

    console.log(sampleFile);

    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
        pool.query('UPDATE platillos SET photo = ? WHERE id = ?', [sampleFile.name, id])
        req.flash('success', 'Platillo actualizado');
        res.redirect('/platillos');

    });

};
module.exports = fotoPlatillo