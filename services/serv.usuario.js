const nodemailer = require('nodemailer');
const Usuario = require('../models/users');
const jwt = require('jsonwebtoken');

exports.generarToken = function (nombre, apellido, ci) {
    const claveSecreta = 'project-singa-jorge-7341237657';

    const datosUsuario = {
        nombre,
        apellido,
        ci
    };
    const token = jwt.sign(datosUsuario, claveSecreta, { expiresIn: '1h' });

    return token;
}




function fecha_hora() {
    try {
        // Obtener la fecha y hora actual
        const fechaHoraActual = new Date();

        // Obtener la hora, los minutos y los segundos por separado
        const h = fechaHoraActual.getHours();
        const m = fechaHoraActual.getMinutes();
        const s = fechaHoraActual.getSeconds();


        // Obtener el año, mes y día por separado
        const año = fechaHoraActual.getFullYear();
        const mes = (fechaHoraActual.getMonth() + 1).toString().padStart(2, '0'); // Agregamos 1 porque los meses van de 0 a 11
        const dia = fechaHoraActual.getDate().toString().padStart(2, '0');

        // Formatear la fecha en formato 'YYYY-MM-DD'
        const fechaFormateada = `${año}-${mes}-${dia}`;
        // Imprimir la hora actual en formato HH:MM:SS


        // Construir el objeto Date especificando explícitamente la zona horaria
        const fecha = new Date(Date.UTC(año, mes - 1, dia, h, m, s));
        return fecha;
    } catch (error) {
        return error
    }
}
exports.fecha = function () {
    const temp = fecha_hora();
    return fecha_hora();
}

exports.emailRec = async function (req) {
    try {
        const { ci, nombre, correo } = req;
        const usuario = await Usuario.findByPk(ci);
        const PIN = Math.floor(Math.random() * (912354 - 124646) + 124646);
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'luiselcopa3@gmail.com',
                pass: process.env.GMAIL_PASS
            }
        });
        nodemailer.createTestAccount
        const mailOptions = {
            from: 'Jorge Backend',
            to: correo,
            subject: 'Recupera tu cuenta',
            html: `
            <h1>PIN DE ACTIVACION CDE CUENTA</h1>
            <p>Nombre: ${nombre}</p>
            <p>PIN: ${PIN}</p>
            <p>Correo electrónico: ${correo}</p>
            `
        }
        await transporter.sendMail(mailOptions);
        if (usuario) {
            usuario.pin_rec = PIN;
            usuario.vence = fecha_hora();
            usuario.save();
        }
        return usuario;
    } catch (error) {
        return error;
    }
}