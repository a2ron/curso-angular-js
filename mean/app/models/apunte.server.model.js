'use strict';

//Cargar el modulo Mongoose y el objeto Schema
var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

//Definir un nuevo 'ApunteSchema'
var ApunteSchema = new Schema({
   descripcion: String,
   categoria:Number,
   importe:Number
});

//Crear el modelo 'Apuntes' a partir del esquema
mongoose.model('Apunte',ApunteSchema);