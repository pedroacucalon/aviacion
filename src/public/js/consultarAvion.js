async function fetchAviones() {
    const searchId = document.getElementById('searchId').value.trim();
    let urlAviones = 'http://localhost:5500/api/avion'; // Cambia la URL según tu configuración

    // Construir la URL para la búsqueda
    if (searchId) {
        urlAviones += `/${searchId}`; // Búsqueda por ID
    }

    // Añadir un parámetro de cache-busting
    urlAviones += `?_=${new Date().getTime()}`;

    try {
        const response = await fetch(urlAviones);
        if (!response.ok) {
            throw new Error(`Error al obtener datos de aviones: ${response.statusText}`);
        }
        const aviones = await response.json();
        populateTable(aviones);
    } catch (error) {
        console.error('Error:', error);
        displayNoDataMessage();
    }
}

function populateTable(aviones) {
    const tableBody = document.querySelector('#avionesTable tbody');
    const noDataMessage = document.getElementById('noDataMessage');
    tableBody.innerHTML = ''; // Limpiar tabla antes de llenarla

    // Si no se encuentra ningún avión
    if (!aviones || (Array.isArray(aviones) && aviones.length === 0)) {
        noDataMessage.style.display = 'block';
        return;
    }

    noDataMessage.style.display = 'none';

    // Si se recibe un solo objeto en lugar de un array, convertir a array
    if (!Array.isArray(aviones)) {
        aviones = [aviones];
    }

    aviones.forEach(avion => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${avion.codigo}</td>
            <td>${avion.modelo}</td>
            <td>${avion.tipo}</td>
            <td>${avion.capacidad}</td>
            <td>${avion.matricula}</td>
            <td>${avion.estado}</td>
            <td>
                <button onclick="deleteAvion(${avion.codigo})" class="action-button"><i class="bi bi-trash3"></i></button>
                <button onclick="editAvion(${avion.codigo})"class="action-button"><i class="bi bi-pencil-square"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

async function deleteAvion(codigo) {
    // Mostrar mensaje de confirmación
    const confirmDelete = confirm('¿Estás seguro de que quieres eliminar este avión?');

    if (confirmDelete) {
        const urlAviones = `http://localhost:5500/api/avion/${codigo}`; // Cambia la URL según tu configuración

        try {
            const response = await fetch(urlAviones, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Error al borrar el avión: ${errorMessage}`);
            }

            // Actualizar la UI después de borrar
            await fetchAviones(); // Asegúrate de que fetchAviones esté correctamente definido
        } catch (error) {
            console.error(error);
            alert(`No se pudo eliminar el avión: ${error.message}`);
        }
    } else {
        console.log('Eliminación cancelada');
    }
}


function editAvion(codigo) {
    window.location.href = `editarAvion.html?codigo=${codigo}`;
}

function displayNoDataMessage() {
    const noDataMessage = document.getElementById('noDataMessage');
    noDataMessage.style.display = 'block';
    // Limpiar la tabla
    const tableBody = document.querySelector('#avionesTable tbody');
    tableBody.innerHTML = ''; 
}

// Cargar los datos cuando la página esté lista
document.addEventListener('DOMContentLoaded', fetchAviones);
