const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash'); 
const mysqlstore = require('express-mysql-session')(session);
const bodyparser = require('body-parser');
const fileUpload = require('express-fileupload');
const http = require('http');
const mysql = require('mysql')
const myconnection = require('express-myconnection')


const { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT } = require("./keys");
 
const { database } = require('./keys'); 

const app = express(); 
require('./lib/passport');
const server = http.createServer(app);

const  {Server}  = require('socket.io');
const io =  new Server(server);

io.on('connection', (socket) => {
    // console.log('chats');
    // socket.on('chat', (msg)=>{
    //     console.log('mensaje:'+msg)
    // })
    socket.on('chat', (msg)=>{
        io.emit('chat', msg)
    })
})
//settings
app.set('port', process.env.PORT || 3400);

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
/// archivos compartidos


//midlewars
app.use(fileUpload());
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());


app.use(myconnection(mysql, {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dijital'
}))

const options = {
    host: MYSQLHOST,
    port: MYSQLPORT,
    user: MYSQLUSER,
    password: MYSQLPASSWORD,
    database: MYSQLDATABASE,
    createDatabaseTable: true
};

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',    
    resave: false,
    saveUninitialized: false,
    store: new mysqlstore(options),
})); 

const sessionStore = new mysqlstore(options)
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//midlewars

//Global Variables
app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
});



//routes
app.use(require('./routes'));
app.use(require('./routes/authentication.routes'));
app.use('/users', require('./routes/users.routes'));
app.use('/bebidas', require('./routes/bebidas.routes'));
app.use('/categorias', require('./routes/categorias.routes'));
app.use('/dueños', require('./routes/dueños.routes'));
app.use('/dulces', require('./routes/dulces.routes'));
app.use('/menus', require('./routes/menus.routes'));
app.use('/platillos', require('./routes/platillos.routes'));
app.use('/porciones', require('./routes/porciones.routes'));
app.use('/restaurantes', require('./routes/restaurantes.routes'));
app.use('/socios', require('./routes/socios.routes'));



//public
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/images/img-profile')));
app.use(express.static(path.join(__dirname, 'public/images/img-bebida')));
app.use(express.static(path.join(__dirname, 'public/images/img-categorias')));
app.use(express.static(path.join(__dirname, 'public/images/img-dueños')));
app.use(express.static(path.join(__dirname, 'public/images/img-dulces')));
app.use(express.static(path.join(__dirname, 'public/images/img-menus')));
app.use(express.static(path.join(__dirname, 'public/images/img-platillos')));
app.use(express.static(path.join(__dirname, 'public/images/img-porciones')));
app.use(express.static(path.join(__dirname, 'public/images/img-restaurantes')));



// starting the server

server.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});