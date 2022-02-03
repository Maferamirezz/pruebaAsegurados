var express = require('express');
var router = express.Router();
var asegurado = require('../models/asegurado');
var mongoose = require('mongoose');

//OBTENER ASEGURADOS
router.get('/', function(req, res) {
    asegurado.find({}, {
            nombres: true,
            apellidos: true,
            numeroIdentidad: true,
            fechaNacimiento: true,
            fechaAlta: true,
            empresa: true,
            poliza: true,
            certificado: true,
            dependientes: true
        })
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        })
})

//OBTENER ASEGURADO POR ID
router.get('/identidad', function(req, res) {
    asegurado.find({}, {
            numeroIdentidad: true,
        })
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        })
})

//BUSCAR ASEGURADO POR ID
router.get('/:idAseg/id', function(req, res) {
    asegurado.find({ _id: mongoose.Types.ObjectId(req.params.idAseg) }, {
            nombres: true,
            apellidos: true,
            numeroIdentidad: true,
            fechaNacimiento: true,
            fechaAlta: true,
            empresa: true,
            poliza: true,
            certificado: true,
            dependientes: true
        })
        .then(result => {
            res.send(result[0]);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        })
})

//OBTENER DEPENDIENTES DE UN ASEGURADO

//ANADIR UN ASEGURADO
router.post('/', function(req, res) {
    let a = new asegurado({
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        fechaNacimiento: req.body.fechaNacimiento,
        fechaAlta: req.body.fechaAlta,
        poliza: req.body.poliza,
        certificado: req.body.certificado,
        empresa: req.body.empresa,
        numeroIdentidad: req.body.numeroIdentidad,
        dependientes: []
    })
    a.save()
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        })
})

//ANADIR UN DEPENDIENTE
router.post('/:idAseg/dependiente', function(req, res) {

    asegurado.update({ _id: mongoose.Types.ObjectId(req.params.idAseg) }, {
            $push: {
                dependientes: {
                    _id: mongoose.Types.ObjectId(),
                    nombres: req.body.nombres,
                    apellidos: req.body.apellidos,
                    identidad: req.body.identidad,
                    parentesco: req.body.parentesco
                }
            }
        })
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
})

module.exports = router;