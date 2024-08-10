document.addEventListener('DOMContentLoaded', () => {
    const numericFields = ['cedula', 'celular']; // Lista de IDs de campos que solo deben permitir números
    const positiveNumberFields = ['horas_vuelo'];
    const emailField = document.getElementById('email');
    const nameField = document.getElementById('nombre_completo');

    // Validar campos numéricos
    numericFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', function () {
                this.value = this.value.replace(/\D/g, ''); // Eliminar todos los caracteres no numéricos
            });
        }
    });

    // Validar campos de números positivos
    positiveNumberFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', function () {
                this.value = this.value.replace(/[^0-9]/g, ''); // Eliminar todos los caracteres que no sean números positivos
            });
        }
    });

    // Validar campo de nombre completo (solo letras y espacios) y convertir a mayúsculas
    nameField.addEventListener('input', function () {
        this.value = this.value.replace(/[^a-zA-Z\s]/g, ''); // Eliminar todos los caracteres que no sean letras o espacios
        this.value = this.value.toUpperCase(); // Convertir a mayúsculas
    });

    // Validar correo electrónico
    emailField.addEventListener('input', function () {
        this.value = this.value.replace(/[^a-zA-Z0-9@.-]/g, ''); // Eliminar caracteres no permitidos
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(this.value)) {
            this.setCustomValidity('Por favor, ingrese una dirección de correo electrónico válida.');
        } else {
            this.setCustomValidity('');
        }
    });

    const urlPersona = 'http://localhost:5500/api/persona';
    const urlPiloto = 'http://localhost:5500/api/piloto';

    const btnInsertar = document.getElementById('btnInsertar');
    const txtNombre_completo = document.getElementById('nombre_completo');
    const txtCedula = document.getElementById('cedula');
    const txtFecha_nacimiento = document.getElementById('fecha_nacimiento');
    const txtCelular = document.getElementById('celular');
    const txtEmail = document.getElementById('email');
    const txtHoras_vuelo = document.getElementById('horas_vuelo');
    const txtFecha_contratacion = document.getElementById('fecha_contratacion');

    btnInsertar.addEventListener('click', async (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario

        // Validación de campos
        if (
            !txtNombre_completo.value.trim() ||
            !txtCedula.value.trim() ||
            !txtFecha_nacimiento.value ||
            !txtCelular.value.trim() ||
            !txtEmail.value.trim() ||
            !txtHoras_vuelo.value.trim() ||
            !txtFecha_contratacion.value
        ) {
            alert('Por favor, complete todos los campos obligatorios');
            return;
        }

        // Validar Mayoría de Edad
        const fechaActual = new Date();
        const fechaNacimiento = new Date(txtFecha_nacimiento.value);
        const fechaContratacion = new Date(txtFecha_contratacion.value);
        const diaContratacion = fechaContratacion.getDate();
        // Calcular la edad en años
        let anio = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
        let mes = fechaActual.getMonth() - fechaNacimiento.getMonth();
        let dia = fechaActual.getDate() - fechaNacimiento.getDate();

        if (mes < 0 || (mes === 0 && dia < 0)) {
            anio--;
        }

        if (anio < 18) {
            alert('La persona debe tener al menos 18 años.');
            return;
        }

        // Validar Fecha de Contratación
        const unAnioDespues = new Date(fechaActual);
        unAnioDespues.setFullYear(fechaActual.getFullYear() + 1);
        fechaContratacion.setDate(diaContratacion + 1)
        fechaActual.setHours(0, 0, 0, 0);
        fechaContratacion.setHours(0, 0, 0, 0);
        // Asegurarse de que la fecha de contratación no sea anterior a la fecha actual
        if (fechaContratacion < fechaActual) {
            alert(`La fecha de contratación no puede ser anterior a la fecha actual.`);
            return;
        }

        // Asegurarse de que la fecha de contratación no sea mayor a un año desde la fecha actual
        if (fechaContratacion > unAnioDespues) {
            alert('La fecha de contratación no puede ser mayor a un año desde la fecha actual.');
            return;
        }




        // Validar correo electrónico
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(txtEmail.value.trim())) {
            alert('Por favor, ingrese una dirección de correo electrónico válida.');
            txtEmail.focus();
            return;
        }
        // Validar Cédula
        if (txtCedula.value.trim().length < 10) {
            alert('Por favor, ingrese una cédula válida.');
            txtCedula.focus();
            return;
        }
        // Validar Celular
        if (txtCelular.value.trim().length < 10) {
            alert('Por favor, ingrese un número de celular válido.');
            txtCelular.focus();
            return;
        }

        try {
            // Primer POST para insertar datos de la persona
            const responsePersona = await fetch(urlPersona, {
                method: 'POST',
                body: JSON.stringify({
                    nombre_completo: txtNombre_completo.value.trim(),
                    cedula: txtCedula.value.trim(),
                    fecha_nacimiento: txtFecha_nacimiento.value.trim(),
                    celular: txtCelular.value.trim(),
                    email: txtEmail.value.trim()
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            if (!responsePersona.ok) {
                throw new Error(`Error al ingresar datos de persona: ${responsePersona.statusText}`);
            }

            console.log(`Datos de persona ingresados: nombre completo ${txtNombre_completo.value}, cedula ${txtCedula.value}`);

            // Obtener el código de persona con el GET usando la cédula
            const urlPersonaCedula = `${urlPersona}/cedula/${txtCedula.value}`;
            const responsePersonaCedula = await fetch(urlPersonaCedula);

            if (!responsePersonaCedula.ok) {
                throw new Error(`Error al consultar datos de persona: ${responsePersonaCedula.statusText}`);
            }

            const persona = await responsePersonaCedula.json();
            const codigo_persona = persona.codigo; // Usa el código obtenido
            console.log(`Código de persona: ${codigo_persona}`);

            // Segundo POST para insertar datos del piloto usando el código de la persona
            const responsePiloto = await fetch(urlPiloto, {
                method: 'POST',
                body: JSON.stringify({
                    horas_vuelo: txtHoras_vuelo.value,
                    fecha_contratacion: txtFecha_contratacion.value.trim(),
                    codigo_persona: codigo_persona // Usa el código de persona obtenido
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            if (!responsePiloto.ok) {
                throw new Error(`Error al ingresar datos del piloto: ${responsePiloto.statusText}`);
            }
            alert('Piloto ingresado correctamente');
            window.location.href = 'consultarPiloto.html'; // Redirigir a la página de consulta

        } catch (error) {
            console.error('Error:', error);
            alert('La cédula ingresada ya existe. Por favor, inténtelo nuevamente.');
        }
    });
});
