const pool = require("../config/database");
const menus = require("../models/menu.model");


const Menus = {};

Menus.getListMenus = async (req, res) => {
    const menus = await pool.query('SELECT * FROM  menus');
    res.render('Pages/menu/list-menus', { menus });
};

Menus.getAddMenus = async (req, res) => {
    res.render('Pages/menu/menus')
};

Menus.postMenu = async (req, res) => {
    const {
        nombre_menu, descripcion, precio, foto,
    } = req.body;
    const newLink = {
        nombre_menu, descripcion, precio, foto,
    };
    await pool.query('INSERT INTO menus set ?', [newLink]);
    //Flash
    req.flash('success', 'Agregado Correctamenta');
    res.redirect("/menus/list-menus");
};

Menus.deleteMenu = async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM menus WHERE ID = ?", [id]);
    req.flash('success', 'Eliminado correctamente');
    res.redirect("/menus/list-menus");
};

//actualizar//
Menus.getMenu = async (req, res) => {
    const { id } = req.params;
    const menu = await pool.query('SELECT * FROM menus WHERE id = ?', [id]);
    res.render('Pages/menu/edit-menus', { menu: menu[0] });

};

//se mostrara actualizado en la lista//
Menus.updateMenu = async (req, res) => {
    const { id } = req.params;
    const { nombre_menu, descripcion, precio, foto,
    } = req.body;
    const newLink = {
        nombre_menu, descripcion, precio, foto,

    };
    console.log({ id, newLink })
    await pool.query('UPDATE menus set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Editado Correctamenta');
    res.redirect('/menus/list-menus');
};

module.exports = Menus;
