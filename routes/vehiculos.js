const express = require("express");
const router = express.Router();
const vehiculoController = require("../controllers/vehiculoController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//Crea vehiculos
// api/vehiculos
router.post(
  "/",
  auth,
  [
    check("patente", "La patente del Vehiculo es Obligatoria").not().isEmpty(),
    check("descripcion", "La descripcion del Vehiculo es Obligatoria")
      .not()
      .isEmpty(),
    check("promedio", "El promedio del Vehiculo es Obligatorio")
      .not()
      .isEmpty(),
  ],
  vehiculoController.crearVehiculo
);

//Obtener todos los vehiculos
router.get("/", auth, vehiculoController.obtenerVehiculos);

//Actualizar Vehiculo via ID
router.put(
  "/:id",
  auth,
  [
    check("patente", "La patente del Vehiculo es Obligatoria").not().isEmpty(),
    check("descripcion", "La descripcion del Vehiculo es Obligatoria")
      .not()
      .isEmpty(),
    check("promedio", "El promedio del Vehiculo es Obligatorio")
      .not()
      .isEmpty(),
  ],
  vehiculoController.actualizarVehiculo
);

//Eliminar un Vehiculo
router.delete("/:id", auth, vehiculoController.eliminarVehiculo);

module.exports = router;
