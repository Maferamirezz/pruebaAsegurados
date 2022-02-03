var mongoose = require('mongoose');
var esquema = new mongoose.Schema({
    email: String,
    contrasenia: String
});

module.exports = mongoose.model('usuarios', esquema);