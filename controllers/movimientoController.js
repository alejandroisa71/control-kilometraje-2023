const Movimiento = require('../models/Movimiento');
const Vehiculo = require('../models/Vehiculo');
const { validationResult } = require('express-validator');
const moment = require('moment');

//Crea un nuevo movimiento
exports.crearMovimiento = async (req, res) => {
  //Revisamos si hay errores
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //Extraer el vehiculo y comprobar si existe
  try {
    const { vehiculo } = req.body;
    const existeVehiculo = await Vehiculo.findById(vehiculo);
    if (!existeVehiculo) {
      return res.status(404).json({ msg: 'Vehiculo no encontrado' });
    }
    //Creamos el movimiento
    // // //TODO
    // const {fecha}= req.body;
    // console.log('----');
    // console.log(fecha);
    // console.log('-------');
    const movimiento = new Movimiento(req.body);
    await movimiento.save();
    res.json({ movimiento });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

// Obtiene los movimientos por vehiculo
exports.obtenerMovimientos = async (req, res) => {
  try {
    //Extraer el vehiculo y comprobar si existe
    const { vehiculo } = req.query;

    const existeVehiculo = await Vehiculo.findById(vehiculo);

    if (!existeVehiculo) {
      res.status(404).json({ msg: 'Vehiculo no encontrado' });
    }

    //Obtener las tareas por vehiculo
    const movimientos = await Movimiento.find({ vehiculo }).sort({
      final: -1, 
    });
    res.json({ movimientos }); 
  } catch (error) {
    console.log(error); 
    res.status(500).send('Hubo un Error');
  } 
};

//Actualizar un Movimiento
exports.actualizarMovimiento = async (req, res) => {
  try {
    //Extraer el vehiculo y comprobar si existe
    const { vehiculo, fecha, final, detalle, estado } = req.body; 

    //Si el movimiento existe o no
    let movimiento = await Movimiento.findById(req.params.id);

    if (!movimiento) {
      return res.status(404).json({ msg: 'No existe movimiento' });
    }

    const existeVehiculo = await Vehiculo.findById(vehiculo);
    if (!existeVehiculo) {
      res.status(404).json({ msg: 'Vehiculo no encontrado' });
    }

    //Crear un objeto con la nueva informacion
    const nuevoMovimiento = {};
    nuevoMovimiento.fecha = fecha;
    nuevoMovimiento.final = final;
    nuevoMovimiento.detalle = detalle;
    nuevoMovimiento.estado = estado;

    //Guardar el movimiento
    movimiento = await Movimiento.findOneAndUpdate(
      { _id: req.params.id },
      nuevoMovimiento,
      { new: true }
    );

    res.json({ movimiento });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un Error');
  }
};

//Eliminar un movimiento
exports.eliminarMovimiento = async (req, res) => {

   

   
  try {
     //Extraer el vehiculo y comprobar si existe
     const { vehiculo } = req.query;  
    //Si el movimiento existe o no
    let movimiento = await Movimiento.findById(req.params.id);

    if (!movimiento) {
      return res.status(404).json({ msg: 'No existe movimiento' });
    }

    const existeVehiculo = await Vehiculo.findById(vehiculo);

    //Eliminar
    await Movimiento.findByIdAndRemove({ _id: req.params.id });
    res.json({ msg: 'Movimiento Eliminado' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un Error');
  }
};
