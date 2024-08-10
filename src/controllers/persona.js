import {consultarTodos, consultarPorCodigo, insertar,eliminar,actualizar,consultarPorCedula} from '../services/persona.js'

export const crearPersona = async (req, res) => {
    try {
        let nombre_completo = req.body.nombre_completo;
        let cedula = req.body.cedula;
        let fecha_nacimiento = new Date(req.body.fecha_nacimiento);
        let celular = req.body.celular;
        let email = req.body.email;

        let personaNuevo = await insertar(nombre_completo, cedula, fecha_nacimiento, celular, email);
        res.status(201).send(personaNuevo);
    } catch (error) {
        console.error('Error al crear persona:', error);
        res.status(500).send('Error interno del servidor');
    }
}

export const obtenerTodos = async(req, res)=>{
    try {
        let personas = await consultarTodos()
        if(!personas){
            return res.status(404).send('Persona no encontrado..')
        }
        res.send(personas)
    } catch{
        res.status(500).send('Error interno del servidor')
    }
}

export const obtenerPorCodigo= async (req,res) =>{
    try {
        let codigo = parseInt(req.params.codigo);
        let personaEncontrado = await consultarPorCodigo(codigo);
        if (!personaEncontrado) {
            return res.status(404).send(`Persona ${codigo} no encontrado...`)
        }
        res.send(personaEncontrado);
    } catch (error) {
        console.error('Error al obtener persona por código',error);
        res.status(500).send('Error interno del servidor');
    }
}


export const obtenerPorCedula = async(req,res) =>{
    try{
        let cedula = req.params.cedula;
        let personaEncontrada = await consultarPorCedula(cedula);
        console.log(personaEncontrada)
        
        if(!personaEncontrada){
            return res.status(404).send(`Persona con C.I: ${cedula} no encontrado`)
        }
        res.send(personaEncontrada)
    }
    catch(error){
        console.error('Error al obtener cliente por ID:',error);
        res.status(500).send('Error interno del servidor');
    }
}
//PREGUNTAR!!!!!!!!!!!!!!!!!!!!!!
export const eliminarPersona = (req, res) => {
    let resultado = eliminar(parseInt(req.params.codigo))
    if (resultado === -1) return res.status(404).send(`Persona con C.I: ${req.params.codigo} no existe !!!`)
    return res.send(`Persona con codigo: ${req.params.codigo} eliminado satisfactoriamente...`)
}

export const actualizarPersona = (req, res) => {
    let resultado = actualizar(req.params.codigo, req.body.nombre_completo,req.body.cedula, new Date(req.body.fecha_nacimiento),
    req.params.celular, req.params.email)
    if(resultado === -1) return res.status(404).send(`persona con codigo: ${req.params.codigo} no encontrado !!!`)
    return res.send(resultado)
}