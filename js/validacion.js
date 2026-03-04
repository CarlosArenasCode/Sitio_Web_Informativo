/* ═══════════════════════════════════════
   VALIDACIÓN DEL FORMULARIO DE CONTACTO
   ═══════════════════════════════════════ */

// Esperar a que cargue el DOM
document.addEventListener('DOMContentLoaded', function () {

    const formulario = document.getElementById('formularioContacto');

    formulario.addEventListener('submit', function (evento) {
        evento.preventDefault(); // evitar envío por defecto

        // Obtener valores de los campos
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const asunto = document.getElementById('asunto').value;
        const mensaje = document.getElementById('mensaje').value.trim();

        let formularioValido = true;

        // --- Validar nombre (mínimo 3 caracteres) ---
        if (nombre.length < 3) {
            marcarInvalido('nombre');
            formularioValido = false;
        } else {
            marcarValido('nombre');
        }

        // --- Validar email (formato correcto) ---
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            marcarInvalido('email');
            formularioValido = false;
        } else {
            marcarValido('email');
        }

        // --- Validar teléfono (exactamente 10 dígitos) ---
        const regexTelefono = /^\d{10}$/;
        if (!regexTelefono.test(telefono)) {
            marcarInvalido('telefono');
            formularioValido = false;
        } else {
            marcarValido('telefono');
        }

        // --- Validar asunto (debe seleccionar algo) ---
        if (asunto === '') {
            marcarInvalido('asunto');
            formularioValido = false;
        } else {
            marcarValido('asunto');
        }

        // --- Validar mensaje (mínimo 10 caracteres) ---
        if (mensaje.length < 10) {
            marcarInvalido('mensaje');
            formularioValido = false;
        } else {
            marcarValido('mensaje');
        }

        // --- Si todo es válido, mostrar modal y limpiar ---
        if (formularioValido) {
            const modal = new bootstrap.Modal(document.getElementById('modalConfirmacion'));
            modal.show();
            formulario.reset();
            // Quitar clases de validación
            formulario.querySelectorAll('.is-valid').forEach(function (campo) {
                campo.classList.remove('is-valid');
            });
        }
    });

    // Función para marcar un campo como inválido
    function marcarInvalido(idCampo) {
        const campo = document.getElementById(idCampo);
        campo.classList.add('is-invalid');
        campo.classList.remove('is-valid');
    }

    // Función para marcar un campo como válido
    function marcarValido(idCampo) {
        const campo = document.getElementById(idCampo);
        campo.classList.add('is-valid');
        campo.classList.remove('is-invalid');
    }

    // Quitar error al escribir en un campo
    const campos = ['nombre', 'email', 'telefono', 'asunto', 'mensaje'];
    campos.forEach(function (idCampo) {
        document.getElementById(idCampo).addEventListener('input', function () {
            this.classList.remove('is-invalid');
        });
    });
});
