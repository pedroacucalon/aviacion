import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient({log:['query','info','warn','error']})

export async function  insertar(nombre_completo, cedula, fecha_nacimiento, celular, email) {
    let nuevoPersona = await prisma.persona.createMany({
        data:[
            {nombre_completo: nombre_completo,
            cedula: cedula,
            fecha_nacimiento: fecha_nacimiento,
            celular: celular,
            email: email
            }
        ]
    })
    try {
        const response = await fetch(urlPersona, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre_completo, cedula, fecha_nacimiento, celular, email }),
        });

        if (response.status === 400) {
            const data = await response.json();
            alert(data.message); // Mostrar mensaje de cédula ya registrada
        } else if (!response.ok) {
            throw new Error(`Error al crear la persona: ${response.statusText}`);
        } else {
            const nuevoPersona = await response.json();
            alert('Persona creada correctamente');
            // Redirigir o limpiar el formulario aquí
        }
    } catch (error) {
        console.error('Error:', error);
    }
    return nuevoPersona
}

export async function consultarPorCodigo(codigo){
    let persona = await prisma.persona.findFirst({
        where:{
            codigo: codigo,
        }
    })
    return persona
}

export async function consultarTodos(){
    let persona = await prisma.persona.findMany({
        orderBy:{
            codigo: 'asc'
        }
    })
    return persona
}

export async function consultarPorCedula(cedula){
    console.log(`cedula ${cedula}`)
    let persona = await prisma.persona.findFirst({
        where:{
            cedula: cedula
        },
    })
    console.log(`persona ${persona}`)
    return persona
}

export async function eliminar(codigo) {
    const respuesta = await prisma.persona.delete({
        where:{
            codigo:codigo,
        },
    })
    return respuesta
}

export async function actualizar(codigo, nombre_completo, cedula, fecha_nacimiento, celular, email) {
    const personaCodigo = parseInt(codigo,10)
    const persona = await prisma.persona.update({
        where:{
            codigo: personaCodigo,
        },
        data: {
            nombre_completo: nombre_completo,
            cedula: cedula,
            fecha_nacimiento: fecha_nacimiento,
            celular: celular,
            email: email,
        },
    })

    return persona
}