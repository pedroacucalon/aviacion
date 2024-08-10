import express from 'express'
import {pilotoRouter} from './routes/piloto.js'
import {personaRouter} from './routes/persona.js'
import {avionRouter} from './routes/avion.js'
const app = express()
const puerto = 5500

app.use(express.json());
app.use(express.static('src/public'))
app.use(pilotoRouter)
app.use(personaRouter)
app.use(avionRouter)
app.listen(puerto, ()=> console.log(`escuchando en el puerto ${puerto}`))