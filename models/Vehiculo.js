const mongoose = require('mongoose')

const VehiculoSchema = mongoose.Schema({
  patente:{
    type: String,
    required: true,
    trim:true
  },
  descripcion:{
    type: String,
    required: true,
    trim:true
  },
  promedio:{
    type: Number,
    required: true,
  },
  creador:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Usuario'
  },
  creado:{
    type:Date,
    default:Date.now()
  }
})

module.exports = mongoose.model('Vehiculo', VehiculoSchema)