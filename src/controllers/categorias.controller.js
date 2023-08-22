const pool = require("../config/database");
const categorias = require("../models/categoria.model");


const Categorias = {};

Categorias.getListCategorias = async (req, res) => {
  const categorias = await pool.query('SELECT * FROM  categorias');
    res.render('Pages/categoria/list-categorias', {categorias});
};

Categorias.getAddCategorias = async (req, res) => {
  res.render('Pages/categoria/categorias')
};

Categorias.postCategoria = async (req, res) => {
    const {
      nombre_Categoria,  descripcion, precio, 
    } = req.body;
    const newLink = {
      nombre_Categoria, descripcion, precio, 
    };
    await pool.query('INSERT INTO categorias set ?', [newLink]);
     //Flash
    req.flash('success','Agregado Correctamenta');
    res.redirect("/categorias/list-categorias");
  };

  Categorias.deleteCategoria = async(req, res) =>{
    const { id } = req.params;
    await pool.query("DELETE FROM categorias WHERE ID = ?", [id]);
    req.flash('success','Eliminado correctamente');
    res.redirect("/categorias/list-categorias");
    };

//actualizar//
Categorias.getCategoria = async (req, res) => {
  const { id } = req.params;
  const categoria = await pool.query('SELECT * FROM categorias WHERE id = ?', [id]);
  res.render('Pages/categoria/edit-categorias', {categoria: categoria[0]});
  
};

//se mostrara actualizado en la lista//
Categorias.updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre_categoria,descripcion, precio, 
  } = req.body;
  const newLink = {nombre_categoria, descripcion, precio,
      
  };
  console.log ({ id, newLink})  
  await pool.query('UPDATE categorias set ? WHERE id = ?', [newLink, id]);
  req.flash('success','Editado Correctamenta');  
  res.redirect('/categorias/list-categorias');
};

module.exports = Categorias;
