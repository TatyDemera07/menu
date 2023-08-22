const pool = require("../config/database");
const restaurantes = require("../models/restaurante.model");
const { isLoggedIn } = require('../lib/auth');

const fotoRestaurante= {};

fotoRestaurante.updateFoto = async (req, res) => {
    const { id } = req.params;
    let sampleFile;
    let uploadPath;

    if(!req.files || Object.keys(req.files).length === 0 ) {
        req.flash('message', 'No ingreso el restaurante')
        return res.status(400).redirect('/restaurantes');
    }
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/../public/images/img-restaurantes/' + sampleFile.name;

    console.log(sampleFile);

    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
        pool.query('UPDATE restaurantes SET photo = ? WHERE id = ?', [sampleFile.name, id])
        req.flash('success', 'Resturante actualizado');
        res.redirect('/restaurantes');

    });

};
module.exports = fotoRestaurante