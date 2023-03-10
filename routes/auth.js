//rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
// const { check } = require("express-validator");
const authController = require('../controllers/authContoller');
const auth = require('../middleware/auth');

//Iniciar Sesion
// api/auth
router.post('/', authController.autenticarUsuario);

//Obtiene el usuario autenticado
router.get('/', auth, authController.usuarioAutenticado);

module.exports = router;
