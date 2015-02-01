var config = require('./config');

/**
 * MODULOS REQUERIDOS POR LA APLICACIÓN EXPRESS
 */
var session = require('express-session');
var express = require('express');
var morgan = require('morgan');
var compress = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var flash = require('connect-flash');

//constructor de la app
module.exports = function()
{
    var app = express();

    //modulos a cargar en la app
    if (process.env.NODE_ENV === 'development')
    {
        app.use(morgan('dev'));
    }
    else if (process.env.NODE_ENV === 'production')
    {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    //motor de plantillas (servidor)
    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    app.use(flash());
    //registar middlewares passport
    app.use(passport.initialize());
    app.use(passport.session());

    //rutas de la app
    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/apuntes.server.routes.js')(app);
    require('../app/routes/categoriaApuntes.server.routes.js')(app);
    require('../app/routes/usuarios.server.routes.js')(app);

    //para usar archivos estáticos
    app.use(express.static('./public'));

    //devolver la app
    return app;
};