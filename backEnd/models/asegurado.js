var mongoose = require('mongoose');
var esquema = new mongoose.Schema({
    nombres: String,
    apellidos: String,
    numeroIdentidad: Number,
    fechaNacimiento: Date,
    fechaAlta: Date,
    empresa: String,
    poliza: Number,
    certificado: Number,
    dependientes: Array
});

module.exports = mongoose.model('asegurados', esquema);