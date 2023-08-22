const pool = require("../config/database");
const socios = require("../models/socio.model");


const Socios = {};

Socios.getListSocios = async (req, res) => {
    const socios = await pool.query('SELECT * FROM  socios');
    res.render('Pages/socio/list-socios', { socios });
};

Socios.getAddSocios = async (req, res) => {
    res.render('Pages/socio/socios')
};

Socios.postSocio = async (req, res) => {
    const {
        nombre_socio, descripcion, precio,
    } = req.body;
    const newLink = {
        nombre_socio, descripcion, precio,
    };
    await pool.query('INSERT INTO socios set ?', [newLink]);
    //Flash
    req.flash('success', 'Agregado Correctamenta');
    res.redirect("/socios/list-socios");
};

Socios.deleteSocio = async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM socios WHERE ID = ?", [id]);
    req.flash('success', 'Eliminado correctamente');
    res.redirect("/socios/list-socios");
};

//actualizar//
Socios.getSocio = async (req, res) => {
    const { id } = req.params;
    const socio = await pool.query('SELECT * FROM socios WHERE id = ?', [id]);
    res.render('Pages/socio/edit-socios', { socio: socio[0] });

};

//se mostrara actualizado en la lista//
Socios.updateSocio = async (req, res) => {
    const { id } = req.params;
    const { nombre_socio, descripcion, precio,
    } = req.body;
    const newLink = {
        nombre_socio, descripcion, precio,

    };
    console.log({ id, newLink })
    await pool.query('UPDATE socios set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Editado Correctamenta');
    res.redirect('/socios/list-socios');
};

module.exports = Socios;
