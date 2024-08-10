import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })

export async function insertar(horas_vuelo, fecha_contratacion, codigo_persona) {
    try {
        let nuevoPiloto = await prisma.piloto.createMany({
            data: [
                {
                    horas_vuelo: horas_vuelo,
                    fecha_contratacion: fecha_contratacion,
                    codigo_persona: codigo_persona
                }
            ]
        })
        return nuevoPiloto
    } catch (error) {
        return error
    }
}

export async function consultarTodos() {
    let piloto = await prisma.piloto.findMany({
        include: {
            persona: true
        },
        orderBy: {
            codigo: 'asc'
        },
    })
    return piloto
}

export async function consultarPorCedula(cedulaParcial) {
    try {
        // Validar si la cédula parcial está vacía o es nula
        if (!cedulaParcial) {
            throw new Error('La cédula no puede estar vacía.');
        }

        // Buscar todas las personas que contengan la cédula parcial
        const personas = await prisma.persona.findMany({
            where: {
                cedula: {
                    contains: cedulaParcial,
                },
            },
            select: {
                codigo: true,
                nombre_completo: true,
                cedula: true,
                fecha_nacimiento: true,
                celular: true,
                email: true,
            },
        });

        // Si no se encuentran personas, lanzar un error
        if (personas.length === 0) {
            throw new Error(`No se encontraron personas con la cédula que contiene: ${cedulaParcial}.`);
        }

        // Buscar todos los pilotos asociados a las personas encontradas
        const pilotos = await prisma.piloto.findMany({
            where: {
                codigo_persona: {
                    in: personas.map(persona => persona.codigo),
                },
            },
            include: {
                persona: true,
            },
        });

        return pilotos;
    } catch (error) {
        console.error('Error al consultar pilotos por cédula parcial:', error);
        throw error;
    }
}



export async function eliminar(codigo) {
    const pilotoCodigo = parseInt(codigo,10)
    try {
        // Obtener el piloto para encontrar el código de persona asociado
        const piloto = await prisma.piloto.findUnique({
            where: { codigo: pilotoCodigo }
        });

        if (!piloto) {
            return -1; // Piloto no encontrado
        }

        const codigo_persona = piloto.codigo_persona;

        await prisma.$transaction(async (prisma) => {
            await prisma.piloto.delete({
                where: { codigo: pilotoCodigo }
            });

            await prisma.persona.delete({
                where: { codigo: codigo_persona }
            });
        });
        return pilotoCodigo;
    } catch (error) {
        throw new Error(`Error al eliminar piloto: ${error.message}`);
    }
}

export async function actualizar(codigo, nombre_completo, cedula, fecha_nacimiento, celular, email, horas_vuelo, fecha_contratacion, codigo_persona) {
    const pilotoCodigo = parseInt(codigo, 10);
    try {
        const resultado = await prisma.$transaction(async (prisma) => {
            const persona = await prisma.persona.update({
                where: { codigo: codigo_persona },
                data: {
                    nombre_completo: nombre_completo,
                    cedula: cedula,
                    fecha_nacimiento: fecha_nacimiento,
                    celular: celular,
                    email: email
                },
            });
            const piloto = await prisma.piloto.update({
                where: { codigo: pilotoCodigo },
                data: {
                    horas_vuelo: horas_vuelo,
                    fecha_contratacion: fecha_contratacion,
                    codigo_persona: codigo_persona,
                },
            });
            return { persona, piloto };
        });
        return resultado;
    } catch (error) {
        console.error('Error al actualizar piloto y persona:', error);
        throw error;
    }
}
export async function consultarPorCodigo(codigo) {
    let piloto = await prisma.piloto.findFirst({
        where: {
            codigo: codigo,
        },
        include: {
            persona: true,
        },
    })
    return piloto
}