const express = require("express");
const router = express.Router();
const movimientoController = require("../controllers/movimientoController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//crear un movimiento
// api/movimientos
router.post(
  "/",
  auth,
  [
    check("vehiculo", "El Vehiculo es obligatorio").not().isEmpty(),
    // check("fecha", "La Fecha es obligatoria").not().isEmpty(),
    // check("inicio", "El kilometro Inicial es Obligatorio").not().isEmpty(),
    check("final", "El kilometro Final es Obligatorio").not().isEmpty(),
    check("detalle", "El Detalle es Obligatorio").not().isEmpty(),
  ],
  movimientoController.crearMovimiento
);

// Obtener los movimientos por vehiculos
router.get("/", auth, movimientoController.obtenerMovimientos);

//Actuaizar un movimiento
router.put("/:id", auth, movimientoController.actualizarMovimiento )

//Eliminar un movimiento
router.delete("/:id", auth, movimientoController.eliminarMovimiento )

module.exports = router;
