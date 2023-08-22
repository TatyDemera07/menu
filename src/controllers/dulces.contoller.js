const pool = require("../config/database");
const dulces = require("../models/dulce.model");


const Dulces = {};

Dulces.getListDulces = async (req, res) => {
    const dulces = await pool.query('SELECT * FROM  dulces');
    res.render('Pages/dulce/list-dulces', { dulces });
};

Dulces.getAddDulces = async (req, res) => {
    res.render('Pages/dulce/dulces')
};

Dulces.postDulce = async (req, res) => {
    const {
        nombre_dulce, descripcion, precio,
    } = req.body;
    const newLink = {
        nombre_dulce, descripcion, precio,
    };
    await pool.query('INSERT INTO dulces set ?', [newLink]);
    //Flash
    req.flash('success', 'Agregado Correctamenta');
    res.redirect("/dulces/list-dulces");
};

Dulces.deleteDulce = async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM dulces WHERE ID = ?", [id]);
    req.flash('success', 'Eliminado correctamente');
    res.redirect("/dulces/list-dulces");
};

//actualizar//
Dulces.getDulce = async (req, res) => {
    const { id } = req.params;
    const dulce = await pool.query('SELECT * FROM dulces WHERE id = ?', [id]);
    res.render('Pages/dulce/edit-dulces', { dulce: dulce[0] });

};

//se mostrara actualizado en la lista//
Dulces.updateDulce = async (req, res) => {
    const { id } = req.params;
    const { nombre_dulce, descripcion, precio,
    } = req.body;
    const newLink = {
        nombre_dulce, descripcion, precio,

    };
    console.log({ id, newLink })
    await pool.query('UPDATE dulces set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Editado Correctamenta');
    res.redirect('/dulces/list-dulces');
};

module.exports = Dulces;
