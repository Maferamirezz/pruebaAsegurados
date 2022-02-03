var express = require('express');
var router = express.Router();
var usuario = require('../models/usuario');
var mongoose = require('mongoose');

//OBTENER USUARIO POR CORREO
router.get('/:email', function(req, res) {
    usuario.find({ email: req.params.email }, { email: true, contrasenia: true })
        .then(result => {
            res.send(result[0]);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        })
})

module.exports = router;