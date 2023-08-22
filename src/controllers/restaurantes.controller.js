const pool = require("../config/database");
const restaurantes = require("../models/restaurante.model");


const Restaurantes = {};

Restaurantes.getListRestaurantes = async (req, res) => {
  const restaurantes = await pool.query('SELECT * FROM  restaurantes');
    res.render('Pages/restaurante/list-restaurante', {restaurantes});
};

Restaurantes.getAddRestaurantes = async (req, res) => {
  res.render('Pages/restaurante/restaurantes')
};

Restaurantes.postRestaurante = async (req, res) => {
    const {
      nombre_restaurante, descripcion, telefono,
    } = req.body;
    const newLink = {
      nombre_restaurante, descripcion, telefono,
    };
    await pool.query('INSERT INTO restaurantes set ?', [newLink]);
     //Flash
    req.flash('success','Agregado Correctamenta');
    res.redirect("/restaurantes/list-restaurantes");
  };

  Restaurantes.deleteRestaurante = async(req, res) =>{
    const { id } = req.params;
    await pool.query("DELETE FROM restaurantes WHERE ID = ?", [id]);
    req.flash('success','Eliminado correctamente');
    res.redirect("/restaurantes/list-restaurantes");
    };

//actualizar//
Restaurantes.getRestaurante = async (req, res) => {
  const { id } = req.params;
  const restaurante = await pool.query('SELECT * FROM restaurantes WHERE id = ?', [id]);
  res.render('Pages/restaurante/edit-restaurantes', {restaurante: restaurante[0]});
  
};

//se mostrara actualizado en la lista//
Restaurantes.updateRestaurante = async (req, res) => {
  const { id } = req.params;
  const { nombre_restaurante, descripcion, telefono,
  } = req.body;
  const newLink = {nombre_restaurante, descripcion, telefono,
      
  };
  console.log ({ id, newLink})  
  await pool.query('UPDATE restaurantes set ? WHERE id = ?', [newLink, id]);
  req.flash('success','Editado Correctamenta');  
  res.redirect('/restaurantes/list-restaurantes');
};

module.exports = Restaurantes;
