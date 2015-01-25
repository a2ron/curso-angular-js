var config = require('./config'),
        mongoose = require('mongoose');

module.exports = function()
{
    db = mongoose.connect(config.db);

    //cargar los modelos
    require('../app/models/usuario.server.model');
    
    require('../app/models/categoriaApunte.server.model');
    require('../app/models/apunte.server.model');
    
    return db;
};