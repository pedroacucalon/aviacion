async function fetchPilotos() {
    const searchCI = document.getElementById('searchCI').value.trim();
    let urlPilotos = 'http://localhost:5500/api/piloto'; // Cambia la URL según tu configuración

    // Construir la URL para la búsqueda si se ha ingresado una cédula
    if (searchCI) {
        urlPilotos += `/cedula/${searchCI}`; // Búsqueda por cédula
    }
    
    try {
        const response = await fetch(urlPilotos);
        if (!response.ok) {
            console.error('Error HTTP:', response.status);
            throw new Error('Error en la respuesta del servidor');
        }
        const pilotos = await response.json();
        populateTable(pilotos);
    } catch (error) {
        console.error('Error:', error);
        displayNoDataMessage();
    }
}
function populateTable(pilotos) {
    const tableBody = document.querySelector('#pilotosTable tbody');
    const noDataMessage = document.getElementById('noDataMessage');
    tableBody.innerHTML = ''; // Limpiar tabla antes de llenarla

    // Si no se encuentra ninguna pilotos
    if (!pilotos || (Array.isArray(pilotos) && pilotos.length === 0)) {
        noDataMessage.style.display = 'block';
        return;
    }

    noDataMessage.style.display = 'none';

    // Si se recibe un solo objeto en lugar de un array, convertir a array
    if (!Array.isArray(pilotos)) {
        pilotos = [pilotos];
    }

    pilotos.forEach(piloto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${piloto.persona.nombre_completo}</td>
            <td>${piloto.persona.cedula}</td>
            <td>${formatDate(piloto.persona.fecha_nacimiento)}</td>
            <td>${piloto.persona.celular}</td>
            <td>${piloto.persona.email}</td>
            <td>${piloto.horas_vuelo}</td>
            <td>${formatDate(piloto.fecha_contratacion)}</td>
            <td>
                <button onclick="deletePiloto(${piloto.codigo})" class="action-button"><i class="bi bi-trash3"></i></button>
                <button onclick="editPiloto(${piloto.codigo})"class="action-button"><i class="bi bi-pencil-square"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

async function deletePiloto(codigo) {
    const urlPilotos = `http://localhost:5500/api/piloto/${codigo}`; // Cambia la URL según tu configuración

    // Mostrar mensaje de confirmación
    const confirmDelete = confirm('¿Estás seguro de que quieres eliminar este piloto?');

    if (confirmDelete) {
        try {
            console.log('Deleting piloto with codigo:', codigo); 
            const response = await fetch(urlPilotos, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`Error al borrar el piloto: ${response.statusText}`);
            }
            console.log('Piloto eliminado correctamente'); // Añadido para depuración
            await fetchPilotos(); // Recargar la tabla después de borrar y esperar a que termine
        } catch (error) {
            console.error('Error:', error);
            alert(`No se pudo eliminar el piloto: ${error.message}`);
        }
    } else {
        console.log('Eliminación cancelada');
    }
}

function editPiloto(codigo) {
    window.location.href = `editarPiloto.html?codigo=${codigo}`;
}

function displayNoDataMessage() {
    const noDataMessage = document.getElementById('noDataMessage');
    noDataMessage.style.display = 'block';
    // Limpiar la tabla
    const tableBody = document.querySelector('#pilotosTable tbody');
    tableBody.innerHTML = ''; 
}

// Cargar los datos cuando la página esté lista
document.addEventListener('DOMContentLoaded', fetchPilotos);

function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son de 0 a 11
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Formato: DD/MM/YYYY
}