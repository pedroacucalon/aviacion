const positiveNumberFields = ['capacidad'];
positiveNumberFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
        field.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, ''); // Eliminar todos los caracteres que no sean números positivos
        });
    }
});

// Validar campo de modelo (solo letras, números, espacios y guiones)
const modeloField = document.getElementById('modelo');
if (modeloField) {
    modeloField.addEventListener('input', function () {
        this.value = this.value.replace(/[^a-zA-Z0-9\s-]/g, ''); // Eliminar caracteres no permitidos
    });
}

// Función para obtener el parámetro 'codigo' de la URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Obtener el código de la URL
const codigo = getQueryParam('codigo');

// Cargar los datos del avión en el formulario
async function cargarDatosAvion(codigo) {
    const urlAvion = `http://localhost:5500/api/avion/${codigo}`; // Cambia la URL según tu configuración

    try {
        const response = await fetch(urlAvion);
        if (!response.ok) {
            throw new Error(`Error al obtener datos del avión: ${response.statusText}`);
        }
        const avion = await response.json();
        document.getElementById('modelo').value = avion.modelo;
        document.getElementById('tipo').value = avion.tipo;
        document.getElementById('capacidad').value = avion.capacidad;
        document.getElementById('matricula').value = avion.matricula;
        document.getElementById('estado').value = avion.estado;
        document.getElementById('codigo').value = avion.codigo;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Cargar los datos del avión al cargar la página
if (codigo) {
    cargarDatosAvion(codigo);
}

// Función para manejar la vuelta a la página anterior
function goBack() {
    window.history.back();
}

// Manejar el envío del formulario
document.getElementById('editarAvionForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const tipo = document.getElementById('tipo').value;
    const capacidad = document.getElementById('capacidad').value;
    const matricula = document.getElementById('matricula').value;
    const estado = document.getElementById('estado').value;

    const urlAvion = `http://localhost:5500/api/avion/${codigo}`; // Cambia la URL según tu configuración

    try {
        const response = await fetch(urlAvion, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tipo, capacidad, matricula, estado })
        });

        if (!response.ok) {
            throw new Error(`Error al actualizar el avión: ${response.statusText}`);
        }

        alert('Avión actualizado correctamente');
        window.location.href = 'consultarAvion.html'; // Redirigir a la página de consulta
    } catch (error) {
        console.error('Error:', error);
    }
});