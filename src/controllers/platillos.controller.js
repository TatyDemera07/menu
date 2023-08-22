const pool = require("../config/database");
const platillos = require("../models/platillo.model");


const Platillos = {};

Platillos.getListPlatillos = async (req, res) => {
  const platillos = await pool.query('SELECT * FROM  platillos');
    res.render('Pages/platillo/list-platillos', {platillos});
};

Platillos.getAddPlatillos = async (req, res) => {
  res.render('Pages/platillo/platillos')
};

Platillos.postPlatillo = async (req, res) => {
    const {
      nombre_platillo,  descripcion, precio, 
    } = req.body;
    const newLink = {
      nombre_platillo, descripcion, precio, 
    };
    await pool.query('INSERT INTO platillos set ?', [newLink]);
     //Flash
    req.flash('success','Agregado Correctamenta');
    res.redirect("/platillos/list-platillos");
  };

  Platillos.deletePlatillo = async(req, res) =>{
    const { id } = req.params;
    await pool.query("DELETE FROM platillos WHERE ID = ?", [id]);
    req.flash('success','Eliminado correctamente');
    res.redirect("/platillos/list-platillos");
    };

//actualizar//
Platillos.getPlatillo = async (req, res) => {
  const { id } = req.params;
  const platillo = await pool.query('SELECT * FROM platillos WHERE id = ?', [id]);
  res.render('Pages/platillo/edit-platillos', {platillo: platillo[0]});
  
};

//se mostrara actualizado en la lista//
Platillos.updatePlatillo = async (req, res) => {
  const { id } = req.params;
  const { nombre_platillo,descripcion, precio, 
  } = req.body;
  const newLink = {nombre_platillo, descripcion, precio,
      
  };
  console.log ({ id, newLink})  
  await pool.query('UPDATE platillos set ? WHERE id = ?', [newLink, id]);
  req.flash('success','Editado Correctamenta');  
  res.redirect('/platillos/list-platillos');
};

module.exports = Platillos;
