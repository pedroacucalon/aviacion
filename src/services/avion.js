import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })

export async function insertar(modelo,tipo, capacidad, matricula, estado) {
    try {
        let nuevoAvion = await prisma.avion.createMany({
            data: [
                {   modelo: modelo,
                    tipo: tipo,
                    capacidad: capacidad,
                    matricula: matricula,
                    estado: estado
                }
            ]
        })
        return nuevoAvion
    } catch (error) {
        // Solo maneja y lanza errores aquí
        if (error.code === 'P2002') { // Código de error para violación de restricción única
            throw new Error('La matrícula ya existe');
        } else {
            throw new Error('Error en la base de datos');
        }
    }
}

export async function consultarTodos(){
    let avion = await prisma.avion.findMany({
        orderBy:{
            codigo: 'asc'
        }
    })
    return avion
}

export async function consultarPorCodigo(codigo){
    let avion = await prisma.avion.findFirst({
        where:{
            codigo: codigo,
        }
    })
    return avion
}

export async function eliminar(codigo) {
    try {
        const respuesta = await prisma.avion.delete({
            where: {
                codigo: codigo,
            },
        });
        return respuesta;
    } catch (error) {
        console.error('Error al eliminar el avión:', error);
        throw new Error('Error al eliminar el avión');
    }
}

export async function actualizar(codigo,modelo, tipo, capacidad, matricula, estado) {
    const avionCodigo = parseInt(codigo,10)
    const avion = await prisma.avion.update({
        where:{
            codigo: avionCodigo,
        },
        data: {
            modelo: modelo,
            tipo: tipo,
            capacidad: capacidad,
            matricula: matricula,
            estado: estado,
        },
    })

    return avion
}