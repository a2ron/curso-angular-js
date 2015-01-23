process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * CONFIGURACIONES REQUERIDAS
 */
//la BD
var mongoose = require('./config/mongoose');
//la app
var express = require('./config/express');
//autentificacion
var passport = require('./config/passport');

/**
 * CREAR APP Y SERVIR
 */
var db = mongoose();
var app = express();
var passport = passport();
app.listen(3000);
module.exports = app;

console.log('Servidor ejecutándose en http://localhost:3000/');
