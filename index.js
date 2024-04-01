
const express = require('express');
const routesA = require('./routes/admin');
const routesB = require('./routes/beneficiario');
const routesU = require('./routes/usuario');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3000;

// Usa las rutas definidas en routes.js
app.use(bodyParser.json());
app.use(cors())
app.use('/admin', routesA);
app.use('/benf', routesB);
app.use('/user', routesU);

app.listen(PORT, () => {
  console.log(`Servidor API escuchando en el puerto ${PORT}`);
});
