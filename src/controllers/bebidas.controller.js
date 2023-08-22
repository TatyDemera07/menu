const pool = require("../config/database");
const bebidas = require("../models/bebida.model");


const Bebidas = {};

Bebidas.getListBebidas = async (req, res) => {
    const bebidas = await pool.query('SELECT * FROM  bebidas');
    res.render('Pages/bebida/list-bebidas', { bebidas });
};

Bebidas.getAddBebidas = async (req, res) => {
    res.render('Pages/bebida/bebidas')
};

Bebidas.postBebida = async (req, res) => {
    const {
        nombre_bebida, descripcion, precio,
    } = req.body;
    const newLink = {
        nombre_bebida, descripcion, precio,
    };
    await pool.query('INSERT INTO bebidas set ?', [newLink]);
    //Flash
    req.flash('success', 'Agregado Correctamenta');
    res.redirect("/bebidas/list-bebidas");
};

Bebidas.deleteBebida = async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM bebidas WHERE ID = ?", [id]);
    req.flash('success', 'Eliminado correctamente');
    res.redirect("/bebidas/list-bebidas");
};

//actualizar//
Bebidas.getBebida = async (req, res) => {
    const { id } = req.params;
    const bebida = await pool.query('SELECT * FROM bebidas WHERE id = ?', [id]);
    res.render('Pages/bebida/edit-bebidas', { bebida: bebida[0] });

};

//se mostrara actualizado en la lista//
Bebidas.updateBebida = async (req, res) => {
    const { id } = req.params;
    const { nombre_bebida, descripcion, precio,
    } = req.body;
    const newLink = {
        nombre_bebida, descripcion, precio,

    };
    console.log({ id, newLink })
    await pool.query('UPDATE bebidas set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Editado Correctamenta');
    res.redirect('/bebidas/list-bebidas');
};

module.exports = Bebidas;
