import express from 'express'
import {crearPersona, obtenerTodos, obtenerPorCodigo, obtenerPorCedula,eliminarPersona,actualizarPersona} from '../controllers/persona.js'
export const personaRouter = express.Router()
personaRouter.post('/api/persona',crearPersona)
personaRouter.get('/api/persona',obtenerTodos)
personaRouter.get('/api/persona/:codigo',obtenerPorCodigo)
personaRouter.get('/api/persona/cedula/:cedula',obtenerPorCedula)
personaRouter.delete('/api/persona/:codigo',eliminarPersona)
personaRouter.put('/api/persona/:codigo',actualizarPersona)