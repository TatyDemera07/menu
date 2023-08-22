const pool = require("../config/database");
const categorias = require("../models/categoria.model");
const { isLoggedIn } = require('../lib/auth');

const fotoCategoria = {};

fotoCategoria.updateFoto = async (req, res) => {
    const { id } = req.params;
    let sampleFile;
    let uploadPath;

    if(!req.files || Object.keys(req.files).length === 0 ) {
        req.flash('message', 'No ingresas la categoria')
        return res.status(400).redirect('/categorias');
    }
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/../public/images/img-categorias/' + sampleFile.name;

    console.log(sampleFile);

    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
        pool.query('UPDATE categoarias SET photo = ? WHERE id = ?', [sampleFile.name, id])
        req.flash('success', 'Categoria actualizada');
        res.redirect('/categorias');

    });

};
module.exports = fotoCategoria