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
router.post('/iniciar-sesion', async (req,res) => {
    try {
        const { correo, password} = req.body;
        const usuario = await Usuario.findOne({
            where: {
                correo: correo
            }
        })
        console.log(usuario)
        if (!usuario) {
            res.send({"error":"Correo incorrecto"})

        }
        if (usuario.password != password){
            res.send({"error":"Password incorrecto"})
        }
        res.send({"token": generarToken(usuario.nombre, usuario.apellidos, usuario.ci)})
    } catch (error) {
        
    }
})
router.post('/registro', (req, res) => {
    try {
        const user = Usuario.create(req.body);
        res.send(user);
    } catch (error) {
        res.send(error);
    }
});
router.post('/email', async (req, res) => {
    try {
        const { correo } = req.body;
        const user = await Usuario.findOne({
            where: {
                correo: correo
            }
        });
        await emailRec(user);
        res.send(user);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});
router.post('/hora', (req, res) => {
    try {
        res.send({fecha:fecha()})
    } catch (error) {
        res.send(error)
    }
})

module.exports = router;