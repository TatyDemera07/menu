const Sequelize = require('sequelize')
const mysql = require('mysql2/promise')

const dbName = process.env.DB_SCHEMAS || "dijital";

mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  port: process.env.DB_PORT || "3306",
  user     : process.env.DB_USER || "root",
  password : process.env.DB_PASSWORD || "",
}).then( connection => {
  connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`).then((res) => {
      console.info("Database created or verified successfully");
  })
})

const usersModel = require('../models/user.model');
const bebidasModel = require('../models/bebida.model');
const categoriasModel = require('../models/categoria.model');
const dueñosModel = require('../models/dueño.model');
const dulcesModel = require('../models/dulce.model');
const menusModel = require('../models/menu.model');
const platillosModel = require('../models/platillo.model');
const porcionesModel = require('../models/porcion.model');
const restaurantesModel = require('../models/restaurante.model');
const sociosModel = require('../models/socio.model');


const sequelize = new Sequelize(
  'dijital',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      require: 30000,
      idle: 10000
    }
  }
)

sequelize.authenticate()
  .then(() => {
    console.log('Connect')
  })
  .catch(err => {
    console.log('No connect')
  })

sequelize.sync({ force: false })
  .then(() => {
    console.log("synchronized tables")
  })

const users = usersModel(sequelize, Sequelize);
const bebidas = bebidasModel(sequelize, Sequelize);
const categorias =categoriasModel(sequelize, Sequelize);
const dueños = dueñosModel(sequelize, Sequelize);
const dulces = dulcesModel(sequelize, Sequelize);
const menus = menusModel(sequelize, Sequelize);
const platillos = platillosModel(sequelize, Sequelize);
const porciones = porcionesModel(sequelize, Sequelize);
const restaurantes = restaurantesModel(sequelize, Sequelize);
const socios = sociosModel(sequelize, Sequelize);




//Relaciones 
users.hasMany(bebidas)
bebidas.belongsTo(users)

users.hasMany(categorias)
categorias.belongsTo(users)

users.hasMany(dueños)
dueños.belongsTo(users)

users.hasMany(dulces)
dulces.belongsTo(users)

users.hasMany(menus)
menus.belongsTo(users)

users.hasMany(platillos)
platillos.belongsTo(users)

users.hasMany(restaurantes)
restaurantes.belongsTo(users)

users.hasMany(socios)
socios.belongsTo(users)

dueños.hasMany(restaurantes)
restaurantes.belongsTo(dueños)

restaurantes.hasMany(socios)
socios.belongsTo(restaurantes)

restaurantes.hasMany(menus)
menus.belongsTo(restaurantes)

menus.hasMany(categorias)
categorias.belongsTo(menus)

categorias.hasMany(bebidas)
bebidas.belongsTo(categorias)

categorias.hasMany(platillos)
platillos.belongsTo(categorias)

categorias.hasMany(dulces)
dulces.belongsTo(categorias)

categorias.hasMany(porciones)
porciones.belongsTo(categorias)

users.hasMany(dueños)
dueños.belongsTo(users)


module.exports = {
  users,
  dueños,
	restaurantes,
	menus,
	socios,
	categorias,
	porciones,
	bebidas,
	dulces,	
	platillos
   //Exportamos los modelos para usarlo en otros archivos

}