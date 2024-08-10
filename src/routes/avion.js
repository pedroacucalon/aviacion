import express from 'express'
import {crearAvion,obtenerTodos,obtenerPorCodigo,eliminarAvion,actualizarAvion} from '../controllers/avion.js'
export const avionRouter = express.Router()
avionRouter.post('/api/avion',crearAvion)
avionRouter.get('/api/avion',obtenerTodos)
avionRouter.get('/api/avion/:codigo',obtenerPorCodigo)
avionRouter.delete('/api/avion/:codigo',eliminarAvion)
avionRouter.put('/api/avion/:codigo',actualizarAvion)

