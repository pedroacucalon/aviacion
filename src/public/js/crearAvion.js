const urlAvion = 'http://localhost:5500/api/avion';

const btnInsertar = document.getElementById('btnInsertar');
const txtCapacidad = document.getElementById('capacidad');
const txtMatricula = document.getElementById('matricula');
const txtModelo = document.getElementById('modelo');

// Evento para validar la entrada del campo capacidad
txtCapacidad.addEventListener('input', (event) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
});

// Evento para validar y transformar el campo matrícula
txtMatricula.addEventListener('input', (event) => {
    event.target.value = event.target.value.replace(/[^a-zA-Z0-9-]/g, '').toUpperCase();
});

// Evento para validar la entrada del campo modelo
txtModelo.addEventListener('input', (event) => {
    event.target.value = event.target.value.replace(/[^a-zA-Z0-9- ]/g, '');
});

btnInsertar.addEventListener('click', async (event) => {
    event.preventDefault();

    const txtModelo = document.getElementById('modelo').value.trim();
    const txtTipo = document.getElementById('tipo').value.trim();
    const txtCapacidad = document.getElementById('capacidad').value.trim();
    const txtMatricula = document.getElementById('matricula').value.trim();
    const txtEstado = document.getElementById('estado').value.trim();

    // Verificar si algún campo requerido está vacío
    if ( !txtModelo || !txtTipo || !txtCapacidad || !txtMatricula || !txtEstado) {
        alert('Por favor, complete todos los campos obligatorios');
        return;
    }
    if (parseInt(txtCapacidad) === 0){
        alert('La capacidad no puede ser 0');
        return
    }

    try {
        const response = await fetch(urlAvion, {
            method: 'POST',
            body: JSON.stringify({
                modelo: txtModelo,
                tipo: txtTipo,
                capacidad: txtCapacidad,
                matricula: txtMatricula,
                estado: txtEstado
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const data = await response.json();
        if (response.ok) {
            alert('Avion registrado correctmente');
            window.location.href = 'consultarAvion.html'
            
        }else{
            alert(data.message || 'Error al registrar el avión')
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
