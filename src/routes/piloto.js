import express from 'express'
import {crearPiloto,obtenerTodos,obtenerPorCodigo,eliminarPiloto,actualizarPiloto,obtenerPorCedula} from '../controllers/piloto.js'
export const pilotoRouter = express.Router()

pilotoRouter.post('/api/piloto',crearPiloto)
pilotoRouter.get('/api/piloto',obtenerTodos)
pilotoRouter.delete('/api/piloto/:codigo',eliminarPiloto)
pilotoRouter.get('/api/piloto/cedula/:cedula',obtenerPorCedula)
pilotoRouter.get('/api/piloto/codigo/:codigo',obtenerPorCodigo)
pilotoRouter.put('/api/piloto/:codigo',actualizarPiloto)

