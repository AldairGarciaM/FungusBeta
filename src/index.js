const express = require ('express');
const path = require ('path');
const exphbs = require('express-handlebars');
const methodOverride = require ('method-override');
const session = require('express-session');
const mensaje = require('connect-flash');
const passport = require('passport');

//Iniciar
const app = express();
require('./database');
require('./config/passport');

//Ajustes
app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({
   defaultLayout: 'main',
   layoutsDir: path.join(app.get('views'), 'layouts'),
   partialsDir: path.join(app.get('views'), 'partials'),
   extname: '.hbs',
}));

app.set('view engine', '.hbs');

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secretpass',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(mensaje());

//Variables globales
app.use((req, res, next) => {
   res.locals.succes_msg = req.flash('succes_msg');
   res.locals.error_msg = req.flash('error_msg');
   res.locals.error = req.flash('error');
   res.locals.user = req.user || null;

    next();
})
//Rutas
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//Conexion con el servidor
app.listen(app.get('port'), () => {
    console.log('Conectado al servidor: ', app.get('port'));
});