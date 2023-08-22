const pool = require("../config/database");
const porciones = require("../models/porcion.model");


const Porciones = {};

Porciones.getListPorciones = async (req, res) => {
  const porciones = await pool.query('SELECT * FROM  porciones');
    res.render('Pages/porcion/list-porciones', {porciones});
};

Porciones.getAddPorciones = async (req, res) => {
  res.render('Pages/porcion/porciones')
};

Porciones.postPorcion = async (req, res) => {
    const {
      nombre_porcion,  descripcion, precio, 
    } = req.body;
    const newLink = {
      nombre_porcion, descripcion, precio, 
    };
    await pool.query('INSERT INTO porciones set ?', [newLink]);
     //Flash
    req.flash('success','Agregado Correctamenta');
    res.redirect("/porciones/list-porciones");
  };

  Porciones.deletePorcion = async(req, res) =>{
    const { id } = req.params;
    await pool.query("DELETE FROM porciones WHERE ID = ?", [id]);
    req.flash('success','Eliminado correctamente');
    res.redirect("/porciones/list-porciones");
    };

//actualizar//
Porciones.getPorcion= async (req, res) => {
  const { id } = req.params;
  const porcion = await pool.query('SELECT * FROM porciones WHERE id = ?', [id]);
  res.render('Pages/porcion/edit-porciones', {porcion: porcion[0]});
  
};

//se mostrara actualizado en la lista//
Porciones.updatePorcion = async (req, res) => {
  const { id } = req.params;
  const { nombre_porcion,descripcion, precio, 
  } = req.body;
  const newLink = {nombre_porcion, descripcion, precio,
      
  };
  console.log ({ id, newLink})  
  await pool.query('UPDATE porciones set ? WHERE id = ?', [newLink, id]);
  req.flash('success','Editado Correctamenta');  
  res.redirect('/porciones/list-porciones');
};

module.exports = Porciones;
