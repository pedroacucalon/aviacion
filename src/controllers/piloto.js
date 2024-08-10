import {consultarTodos, insertar, consultarPorCodigo, eliminar,actualizar,consultarPorCedula} from '../services/piloto.js'

export const crearPiloto = async (req, res) => {
    try {
        let horas_vuelo = parseInt(req.body.horas_vuelo);
        let fecha_contratacion = new Date(req.body.fecha_contratacion);
        let codigo_persona = req.body.codigo_persona;

        let clienteNuevo = await insertar(horas_vuelo, fecha_contratacion, codigo_persona);
        res.status(201).send(clienteNuevo);
    } catch (error) {
        console.error('Error al crear piloto:', error);
        res.status(500).send('Error interno del servidor');
    }
}

export const obtenerTodos = async(req, res)=>{
    try {
        let pilotos = await consultarTodos()
        if(!pilotos){
            return res.status(404).send('Piloto no encontrado..')
        }
        res.send(pilotos)
    } catch{
        res.status(500).send('Error interno del servidor')
    }
}

export const obtenerPorCedula = async (req, res) => {
    try {
        const cedulaParcial = req.params.cedula;
        console.log('Cédula parcial recibida:', cedulaParcial); // Depuración

        const pilotosEncontrados = await consultarPorCedula(cedulaParcial);
        console.log('Pilotos encontrados:', pilotosEncontrados); // Depuración

        res.json(pilotosEncontrados);
    } catch (error) {
        console.error('Error al obtener pilotos por cédula parcial', error);
        res.status(500).send('Error interno del servidor: ' + error.message);
    }
};

export const eliminarPiloto = async (req, res) => {
    try {
        const resultado = await eliminar(parseInt(req.params.codigo));
        return res.send(`Piloto con código: ${req.params.codigo} eliminado satisfactoriamente...`);
    } catch (error) {
        return res.status(404).send(`Piloto con código: ${req.params.codigo} no existe !!!`);
    }
};

export const actualizarPiloto = async (req, res) => {
    const codigo = parseInt(req.params.codigo);
    const {
        nombre_completo,
        cedula,
        fecha_nacimiento,
        celular,
        email,
        horas_vuelo,
        fecha_contratacion,
        codigo_persona
    } = req.body;

    try {
        const resultado = await actualizar(
            codigo,
            nombre_completo,
            cedula,
            new Date(fecha_nacimiento),
            celular,
            email,
            parseInt(horas_vuelo),
            new Date(fecha_contratacion),
            parseInt(codigo_persona)
        );

        if (!resultado) {
            return res.status(404).send(`Piloto con código: ${codigo} no encontrado !!!`);
        }
        return res.send(resultado);
    } catch (error) {
        console.error('Error al actualizar piloto y persona:', error);
        return res.status(500).send('Error al actualizar piloto y persona');
    }
};

export const obtenerPorCodigo = async (req,res) =>{
    try {
        let codigo = parseInt(req.params.codigo);
        let pilotoEncontrado = await consultarPorCodigo(codigo);
        if (!pilotoEncontrado) {
            return res.status(404).send(`Piloto ${codigo} no encontrado...`)
        }
        res.send(pilotoEncontrado);
    } catch (error) {
        console.error('Error al obtener piloto por código',error);
        res.status(500).send('Error interno del servidor');
    }
}