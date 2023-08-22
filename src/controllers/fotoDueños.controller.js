const pool = require("../config/database");
const dueños = require("../models/dueño.model");
const { isLoggedIn } = require('../lib/auth');

const fotoDueño = {};

fotoDueño.updateFoto = async (req, res) => {
    const { id } = req.params;
    let sampleFile;
    let uploadPath;

    if(!req.files || Object.keys(req.files).length === 0 ) {
        req.flash('message', 'No ingresa el dueño')
        return res.status(400).redirect('/dueños');
    }
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/../public/images/img-dueños/' + sampleFile.name;

    console.log(sampleFile);

    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
        pool.query('UPDATE dueños SET photo = ? WHERE id = ?', [sampleFile.name, id])
        req.flash('success', 'Dueño actualizado');
        res.redirect('/dueños');

    });

};
module.exports = fotoDueño