const mongoose = require('mongoose')

const MovimientoSchema= mongoose.Schema({
//  fecha:{
//   type: String,
//   // required: true,
//   // default: Date.now()
//  },
 inicial:{
  type: Number,
  // required: true,
 },
 final:{
  type: Number,
  required: true,
 },
 detalle:{
  type: String,
  required: true,
  trim: true
 },
 origen:{
    type: String,
    required: true,
    trim: true
   },
   destino:{
    type: String,
    required: true,
    trim: true
   },
   chofer:{
    type: String,
    required: true,
    trim: true
   },  
 promedio:{
  type: Boolean,
  default: false
 },
 estado:{
  type: Boolean,
  default: false
 },

 creado:{
  type:Date,
  default: Date.now()
 },
 vehiculo:{
  type: mongoose.Schema.Types.ObjectId,
  ref:'Vehiculo'
 },

})

module.exports = mongoose.model('Movimiento', MovimientoSchema)