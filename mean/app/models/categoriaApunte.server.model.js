'use strict';
//Cargar el modulo Mongoose y el objeto Schema
var mongoose = require('mongoose'),
        Schema = mongoose.Schema;
//Definir un nuevo 'CategoriaApunteSchema'
var CategoriaApunteSchema = new Schema({
    createdOn: {
        type: Date,
        default: Date.now
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'Usuario'
//        required: 'El Usuario creador de la Categoría es obligatorio'
    },
    titulo: {
        type: String,
        default: '',
        trim: true,
        required: 'El Título de la Categoría es obligatoria'
    },
    descripcion: {
        type: String,
        default: '',
        trim: true
    }
});
//Crear el modelo 'CategoriaApunte' a partir del esquema
mongoose.model('CategoriaApunte', CategoriaApunteSchema);