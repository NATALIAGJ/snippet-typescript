import express from 'express'

import {
  listarEjemplos,
  crearEjemplo,
  crearMultiplesEjemplos,
  editarEjemplo,
  detalleEjemplo,
  eliminarEjemplo
} from '../controllers/ControllerEjemplo'

const EjemploRouter = express.Router()
const querymen = require('querymen')

EjemploRouter.get('/', [
  querymen.middleware({}), 
], listarEjemplos)

EjemploRouter.post('/', crearEjemplo)

EjemploRouter.post('/bulk', crearMultiplesEjemplos)

EjemploRouter.put('/:ejemploId', editarEjemplo)

EjemploRouter.get('/:ejemploId', [
  querymen.middleware({})
], detalleEjemplo)

EjemploRouter.delete('/:ejemploId', eliminarEjemplo)

export default EjemploRouter