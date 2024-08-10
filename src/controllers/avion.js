import { consultarTodos, insertar, consultarPorCodigo, eliminar, actualizar } from '../services/avion.js'

export const crearAvion = async(req, res) => {
    try {
        let modelo = req.body.modelo
        let tipo = req.body.tipo
        let capacidad = parseInt(req.body.capacidad)
        let matricula = req.body.matricula
        let estado = req.body.estado

        let avionNuevo = await insertar(modelo,tipo, capacidad, matricula, estado)
        res.status(201).send(avionNuevo)
    } catch (error) {
        console.error('Error al registrar avión:', error);
        if (error.message === 'La matrícula ya existe') {
            res.status(400).json({ message: 'La matrícula ingresada ya existe. Por favor, inténtelo nuevamente' });
        } else {
            res.status(500).json({ message: 'Error al registrar avión' });
        }
    
};
}

export const obtenerTodos = async (req, res) => {
    try {
        let aviones = await consultarTodos()
        if (!aviones) {
            return res.status(404).send('Avion no encontrado..')
        }
        res.send(aviones)
    } catch {
    }
}

export const obtenerPorCodigo = async (req, res) => {
    try {
        let codigo = parseInt(req.params.codigo);
        let avionEncontrado = await consultarPorCodigo(codigo);
        if (!avionEncontrado) {
            return res.status(404).send(`Avión ${codigo} no encontrado...`)
        }
        res.send(avionEncontrado);
    } catch (error) {
        console.error('Error al obtener avión por código', error);
        res.status(500).send('Error interno del servidor');
    }
}

export const eliminarAvion = async (req, res) => {
    try {
        const resultado = await eliminar(parseInt(req.params.codigo));
        return res.send(`Avión con código: ${req.params.codigo} eliminado satisfactoriamente...`);
    } catch (error) {
        if (error.message === 'Error al eliminar el avión') {
            return res.status(404).send(`Avión con código: ${req.params.codigo} no existe !!!`);
        }
        return res.status(500).send('Error interno del servidor');
    }
}
export const actualizarAvion = (req, res) => {
    let resultado = actualizar(req.params.codigo,req.body.modelo, req.body.tipo, parseInt(req.body.capacidad),
        req.body.matricula, req.body.estado)
    if (resultado === -1) return res.status(404).send(`avion con código: ${req.params.codigo} no encontrado !!!`)
    return res.send(resultado)
}