const express = require('express');
const conectarDB = require("./config/db") 
const cors = require('cors')
// import conectarDB from './config/db.json';  


//Crear el servidor
const app = express();

//Conectar a la DB 
conectarDB()

//Habilitar cors
app.use(cors());

//Habilitar express.json
app.use(express.json({extended: true}));


//puerto de la app
const PORT = process.env.PORT || 4000;

//Importar Rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/vehiculos', require('./routes/vehiculos'))
app.use('/api/movimientos', require('./routes/movimientos'))


//arrancar la app
app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});
