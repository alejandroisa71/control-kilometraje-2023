const Vehiculo = require("../models/Vehiculo");
const { validationResult } = require("express-validator");

exports.crearVehiculo = async (req, res) => {
  //Revisamos si hay errores
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    //Crear un nuevo vehiculo
    const vehiculo = new Vehiculo(req.body);
    //Guardar el creador via JWT
    vehiculo.creador = req.usuario.id;

    //guardamos el vehiculo
    vehiculo.save();
    res.json(vehiculo);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//Obtiene todos los vehiculos
exports.obtenerVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find().sort({ patente: 1 });
    res.json({ vehiculos });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//Actualiza un vehiculo

exports.actualizarVehiculo = async (req, res) => {
  //Revisamos si hay errores
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //Extraer la información del vehiculos
  const { patente, descripcion, promedio } = req.body;
  const nuevoVehiculo = {};

  if (patente) nuevoVehiculo.patente = patente;
  if (descripcion) nuevoVehiculo.descripcion = descripcion;
  if (promedio) nuevoVehiculo.promedio = promedio;

  try {
    //Revisar el ID
    let vehiculo = await Vehiculo.findById(req.params.id);
    // si el vehiculo existe o no
    if (!vehiculo) res.status(404).json({ msg: "Vehiculo no Encontrado" });
    //verificar le creador
    if (vehiculo.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }
    //actualizar
   vehiculo = await Vehiculo.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: nuevoVehiculo,
      },
      { new: true }
    );
    res.json({ vehiculo });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el Servidor");
  }
};

//Elimina un vehciculo por su ID
exports.eliminarVehiculo = async (req, res) => {
 try {
  //Revisar el ID
 let vehiculo = await Vehiculo.findById(req.params.id);
 // si el vehiculo existe o no
 if (!vehiculo) res.status(404).json({ msg: "Vehiculo no Encontrado" });
 //verificar le creador
 if (vehiculo.creador.toString() !== req.usuario.id) {
   return res.status(401).json({ msg: "No Autorizado" });
 }
 //Eliminar el vehciculo
 await Vehiculo.findOneAndRemove({_id: req.params.id})
 res.json({msg: 'Vehiculo eliminado'})
 
 } catch (error) {
  console.log(error);
  res.status(500).send('Error en el Servidor')
 }
}
