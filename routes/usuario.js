const express = require('express');
const { emailRec, fecha, generarToken } = require('../services/serv.usuario');
const Usuario = require('../models/users');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.sendStatus(200);
    } catch (error) {
        res.send(error);
    }
});

//EndPoint para el inicio de sesion
router.post('/iniciar-sesion', async (req, res) => {
    try {
        const { correo, password } = req.body;
        const usuario = await Usuario.findOne({
            where: {
                correo: correo
            }
        })
        console.log(usuario)
        if (!usuario) {
            res.send({ "error": "Correo incorrecto" })

        }
        if (usuario.password != password) {
            res.send({ "error": "Password incorrecto" })
        }
        res.send({ "token": generarToken(usuario.nombre, usuario.apellidos, usuario.ci) })
    } catch (error) {

    }
})

//EndPoint para crear nuevos usuarios
router.post('/registro', (req, res) => {
    try {
        const user = Usuario.create(req.body);
        res.send(user);
    } catch (error) {
        res.send(error);
    }
});

//EndPoint para registrar datos de usuarios
router.post('/actualizar-password', (req, res) => {
    try {
        const { correo, password } = req.body();
        const usuario = Usuario.findOne({
            where: {
                correo: correo
            }
        })
        if (usuario) {
            usuario.password = password
            usuario.save();
        }

        res.send({ "token": generarToken(usuario.nombre, usuario.apellidos, usuario.ci) })
    } catch (error) {

    }
})

//EndPoint para verificar el PIN de recuperacion de contraseña
router.post('/ver-pin', async (req, res) => {
    try {
        const { pin, correo } = req.body;
        const usuario =await  Usuario.findOne({
            where: {
                correo: correo
            }
        });
        // Si el usuario no se encuentra, lanzamos un error
        if (usuario) {
            if(usuario.pin_rec != pin) {
                throw new Error('PIN incorrecto');
            }
        }
        res.sendStatus(200)
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
})

//EndPoint para mandar un correo con el PIN de recuperacion
router.post('/email', async (req, res) => {
    try {
        const { correo } = req.body;
        const user = await Usuario.findOne({
            where: {
                correo: correo
            }
        });
        await emailRec(user);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});
router.post('/hora', (req, res) => {
    try {
        res.send({ fecha: fecha() })
    } catch (error) {
        res.send(error)
    }
})



module.exports = router;