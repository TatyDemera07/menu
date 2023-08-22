const pool = require("../config/database");
const porciones = require("../models/porcion.model");
const { isLoggedIn } = require('../lib/auth');

const fotoPorcion = {};

fotoPorcion.updateFoto = async (req, res) => {
    const { id } = req.params;
    let sampleFile;
    let uploadPath;

    if(!req.files || Object.keys(req.files).length === 0 ) {
        req.flash('message', 'No ingresas la porcion')
        return res.status(400).redirect('/porciones');
    }
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/../public/images/img-porciones/' + sampleFile.name;

    console.log(sampleFile);

    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
        pool.query('UPDATE porciones SET photo = ? WHERE id = ?', [sampleFile.name, id])
        req.flash('success', 'Porcion actualizado');
        res.redirect('/porciones');

    });

};
module.exports = fotoPorcion