const pool = require("../config/database");
const bebidas = require("../models/bebida.model");
const { isLoggedIn } = require('../lib/auth');

const fotoBebida = {};

fotoBebida.updateFoto = async (req, res) => {
    const { id } = req.params;
    let sampleFile;
    let uploadPath;

    if(!req.files || Object.keys(req.files).length === 0 ) {
        req.flash('message', 'No ingresas la bebida')
        return res.status(400).redirect('/bebidas');
    }
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/../public/images/img-bebida/' + sampleFile.name;

    console.log(sampleFile);

    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
        pool.query('UPDATE bebidas SET photo = ? WHERE id = ?', [sampleFile.name, id])
        req.flash('success', 'Bebida actualizada actualizado');
        res.redirect('/bebidas');

    });
    
};
module.exports = fotoBebida