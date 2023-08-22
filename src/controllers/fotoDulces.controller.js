const pool = require("../config/database");
const dulces = require("../models/dulce.model");
const { isLoggedIn } = require('../lib/auth');

const fotoDulce = {};

fotoDulce.updateFoto = async (req, res) => {
    const { id } = req.params;
    let sampleFile;
    let uploadPath;

    if(!req.files || Object.keys(req.files).length === 0 ) {
        req.flash('message', 'No ingresas el dulce')
        return res.status(400).redirect('/dulces');
    }
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/../public/images/img-dulces/' + sampleFile.name;

    console.log(sampleFile);

    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
        pool.query('UPDATE dulces SET photo = ? WHERE id = ?', [sampleFile.name, id])
        req.flash('success', 'Dulce actualizado');
        res.redirect('/dulces');

    });

};
module.exports = fotoDulce