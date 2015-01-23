var config = require('./config'),
        mongoose = require('mongoose');

module.exports = function()
{
    db = mongoose.connect(config.db);

    //cargar los modelos
    require('../app/models/apunte.server.model');
    require('../app/models/usuario.server.model');
    
    return db;
};