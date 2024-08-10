// Función para obtener el parámetro 'codigo' de la URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Obtener el código de la URL
const codigo = getQueryParam('codigo');

// Cargar los datos del piloto en el formulario
let codigo_persona;

async function cargarDatosPiloto(codigo) {
    const urlPiloto = `http://localhost:5500/api/piloto/codigo/${codigo}`; // Cambia la URL según tu configuración
    try {
        const response = await fetch(urlPiloto);
        if (!response.ok) {
            throw new Error(`Error al obtener datos del piloto: ${response.statusText}`);
        }
        const piloto = await response.json();
        document.getElementById('nombre_completo').value = piloto.persona.nombre_completo;
        document.getElementById('cedula').value = piloto.persona.cedula;
        document.getElementById('fecha_nacimiento').value = piloto.persona.fecha_nacimiento.split('T')[0];
        document.getElementById('celular').value = piloto.persona.celular;
        document.getElementById('email').value = piloto.persona.email;
        document.getElementById('horas_vuelo').value = piloto.horas_vuelo;
        document.getElementById('fecha_contratacion').value = piloto.fecha_contratacion.split('T')[0];
        codigo_persona = piloto.codigo_persona;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Cargar los datos del piloto al cargar la página
if (codigo) {
    cargarDatosPiloto(codigo);
}

// Validaciones y manipulaciones de datos del formulario
document.addEventListener('DOMContentLoaded', () => {
    // Validar campo de cédula (solo números)
    const cedulaField = document.getElementById('cedula');
    if (cedulaField) {
        cedulaField.addEventListener('input', function () {
            this.value = this.value.replace(/\D/g, ''); // Eliminar todos los caracteres no numéricos
        });
    }

    // Validar campo de nombre completo (solo letras, espacios y convertir a mayúsculas)
    const nombreField = document.getElementById('nombre_completo');
    if (nombreField) {
        nombreField.addEventListener('input', function () {
            this.value = this.value.replace(/[^a-zA-Z\s]/g, ''); // Eliminar todos los caracteres que no sean letras o espacios
            this.value = this.value.toUpperCase(); // Convertir a mayúsculas
        });
    }

    // Validar campo de celular (solo números, sin espacios ni otros símbolos)
    const celularField = document.getElementById('celular');
    if (celularField) {
        celularField.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, ''); // Eliminar todos los caracteres que no sean números
        });
    }

    // Validar campo de correo electrónico (solo permitir letras, números, . - @)
    const emailField = document.getElementById('email');
    if (emailField) {
        // Eliminar caracteres no permitidos
        emailField.addEventListener('input', function () {
            this.value = this.value.replace(/[^a-zA-Z0-9.@-]/g, ''); // Eliminar caracteres no permitidos
        });

        // Validar formato del correo electrónico
        emailField.addEventListener('input', function () {
            const emailPattern = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(this.value)) {
                this.setCustomValidity('Por favor, ingrese una dirección de correo electrónico válida. Solo se permiten letras, números, puntos, guiones y el símbolo @.');
            } else {
                this.setCustomValidity('');
            }
        });
    }

    // Validar campo de horas de vuelo (solo números)
    const horasVueloField = document.getElementById('horas_vuelo');
    if (horasVueloField) {
        horasVueloField.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, ''); // Eliminar todos los caracteres que no sean números
        });
    }
});

// Función para manejar la vuelta a la página anterior
function goBack() {
    window.history.back();
}


// Manejar el envío del formulario
document.getElementById('editarPilotoForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nombre_completo = document.getElementById('nombre_completo').value;
    const cedula = document.getElementById('cedula').value;
    const fecha_nacimiento = document.getElementById('fecha_nacimiento').value;
    const celular = document.getElementById('celular').value;
    const email = document.getElementById('email').value;
    const horas_vuelo = parseInt(document.getElementById('horas_vuelo').value);
    const fecha_contratacion = document.getElementById('fecha_contratacion').value;

    const urlPiloto = `http://localhost:5500/api/piloto/${codigo}`; // Cambia la URL según tu configuración
    try {
        const responsePiloto = await fetch(urlPiloto, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre_completo,
                cedula,
                fecha_nacimiento,
                celular,
                email,
                horas_vuelo,
                fecha_contratacion,
                codigo_persona
            })
        });

        if (!responsePiloto.ok) {
            throw new Error(`Error al actualizar el piloto: ${responsePiloto.statusText}`);
        }
        alert('Piloto actualizado correctamente');
        window.location.href = '../html/consultarPiloto.html'; // Redirigir a la página de consulta
    } catch (error) {
        console.error('Error:', error);
    }
});

