'use strict';
//Cargar el modulo Mongoose y el objeto Schema
var mongoose = require('mongoose'),
        Schema = mongoose.Schema;
//Definir un nuevo 'ApunteSchema'
var ApunteSchema = new Schema({
    createdOn: {
        type: Date,
        default: Date.now
    },
    titulo: {
        type: String,
        default: '',
        trim: true, 
        required: 'El título del Apunte es obligatorio'
    },
    descripcion: {
        type: String,
        default: '',
        trim: true
    },
    idCategoriaApunte: {
        type: Schema.ObjectId,
        ref: 'CategoriaApunte'
    },
    importe: Number
});
//Crear el modelo 'Apunte' a partir del esquema
mongoose.model('Apunte', ApunteSchema);