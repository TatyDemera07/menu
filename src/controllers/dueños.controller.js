const pool = require("../config/database");
const dueños = require("../models/dueño.model");


const Dueños = {};

Dueños.getListDueños = async (req, res) => {
  const dueños = await pool.query('SELECT * FROM  dueños');
    res.render('Pages/dueño/list-dueños', {dueños});
};

Dueños.getAddDueños = async (req, res) => {
  res.render('Pages/dueño/dueños')
};

Dueños.postDueño = async (req, res) => {
    const {
      nombre_dueño,  descripcion, precio, 
    } = req.body;
    const newLink = {
      nombre_dueño, descripcion, precio, 
    };
    await pool.query('INSERT INTO dueños set ?', [newLink]);
     //Flash
    req.flash('success','Agregado Correctamenta');
    res.redirect("/dueños/list-dueños");
  };

  Dueños.deleteDueño = async(req, res) =>{
    const { id } = req.params;
    await pool.query("DELETE FROM dueños WHERE ID = ?", [id]);
    req.flash('success','Eliminado correctamente');
    res.redirect("/dueños/list-dueños");
    };

//actualizar//
Dueños.getDueño = async (req, res) => {
  const { id } = req.params;
  const dueño = await pool.query('SELECT * FROM dueños WHERE id = ?', [id]);
  res.render('Pages/dueño/edit-dueños', {dueño: dueño[0]});
  
};

//se mostrara actualizado en la lista//
Dueños.updateDueño = async (req, res) => {
  const { id } = req.params;
  const { nombre_dueño,descripcion, precio, 
  } = req.body;
  const newLink = {nombre_dueño, descripcion, precio,
      
  };
  console.log ({ id, newLink})  
  await pool.query('UPDATE dueños set ? WHERE id = ?', [newLink, id]);
  req.flash('success','Editado Correctamenta');  
  res.redirect('/dueños/list-dueños');
};

module.exports = Dueños;
