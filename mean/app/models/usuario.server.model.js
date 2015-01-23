'use strict';

//Cargar el modulo Mongoose y el objeto Schema
var mongoose = require('mongoose'),
        crypto = require('crypto'),
        Schema = mongoose.Schema;

//Definir el esquema del modelo
var UserSchema = new Schema({
    nombre: String,
    apellidos: String,
    username: String,
    password: String,
    email: String,
    salt: {type: String}, //para hacer hash de la contraseña
    provider: {
        type: String,
        required: 'Provider es obligatorio'
    },
    providerId: String,
    providerData: {},
    created: {
        type: Date,
        default: Date.now
    }
});

/**
 * pre-save middleware para manejar el hashing de la clave
 */
UserSchema.pre('save', function(next) {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

/**
 * Para encriptar la clave
 */
UserSchema.methods.hashPassword = function(password)
{
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

/**
 * Autentificación
 */
UserSchema.methods.authenticate = function(password)
{
    if (this.password)
        return this.password === this.hashPassword(password);
    else return false;
};

/**
 * Para encontrar nombre de usuario unico
 * @param {type} username
 * @param {type} suffix
 * @param {type} callback
 * @returns {undefined}
 */
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
    var _this = this;

    var possibleUsername = username + (suffix || '');

    /* buscar el nombre de usuario */
    _this.findOne({
        username: possibleUsername
    }, function(err, user)
    {
        if (!err) {
            if (!user)
                callback(possibleUsername);
            else
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
        }
    });
};

//Crear el modelo a partir del esquema
mongoose.model('Usuario', UserSchema);