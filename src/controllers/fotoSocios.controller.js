const pool = require("../config/database");
const socios = require("../models/socio.model");
const { isLoggedIn } = require('../lib/auth');

const fotoSocio = {};

fotoSocio.updateFoto = async (req, res) => {
    const { id } = req.params;
    let sampleFile;
    let uploadPath;

    if(!req.files || Object.keys(req.files).length === 0 ) {
        req.flash('message', 'No ingresas el socio')
        return res.status(400).redirect('/socios');
    }
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/../public/images/img-socios/' + sampleFile.name;

    console.log(sampleFile);

    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
        pool.query('UPDATE socios SET photo = ? WHERE id = ?', [sampleFile.name, id])
        req.flash('success', 'Socio actualizado');
        res.redirect('/socios');

    });

};
module.exports = fotoSocio