/**
 * Archivo: js/form-validation.js
 * Funcionalidad: Manejo de eventos y validación de formulario usando Expresiones Regulares (RegEx).
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    
    // ===================================================================
    // 1. DEFINICIÓN DE EXPRESIONES REGULARES (RegEx)
    // ===================================================================

    // Expresión Regular para validar un correo electrónico estándar
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    // Expresión Regular para validar nombres: solo letras (incluye acentos) y espacios, longitud mínima de 3
    const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/; 

    // Expresión Regular para validar un mensaje: al menos 15 caracteres de cualquier tipo
    const mensajeRegex = /^[\s\S]{15,}$/;

    // ===================================================================
    // 2. FUNCIÓN DE VALIDACIÓN CENTRAL
    // ===================================================================

    /**
     * Valida un campo individual del formulario contra una RegEx.
     * @param {HTMLElement} inputElement - El elemento input o textarea.
     * @param {RegExp} regex - La expresión regular a usar.
     * @param {string} errorMessage - El mensaje de error si falla la validación.
     * @returns {boolean} - true si es válido, false si no lo es.
     */
    function validateInput(inputElement, regex, errorMessage) {
        const value = inputElement.value.trim();
        const errorDisplay = document.getElementById(`error-${inputElement.id}`);
        
        if (!regex.test(value)) {
            // Falla la validación
            inputElement.classList.add('error');
            errorDisplay.textContent = errorMessage;
            return false;
        } else {
            // Pasa la validación
            inputElement.classList.remove('error');
            errorDisplay.textContent = '';
            return true;
        }
    }

    // ===================================================================
    // 3. MANEJO DEL EVENTO SUBMIT
    // ===================================================================

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Detener el envío por defecto del formulario

        // Validar todos los campos y almacenar los resultados
        const isNombreValid = validateInput(
            document.getElementById('nombre'), 
            nombreRegex, 
            'El nombre debe tener al menos 3 letras y no puede contener números.'
        );

        const isEmailValid = validateInput(
            document.getElementById('email'), 
            emailRegex, 
            'Ingresa un correo electrónico válido (ej: usuario@dominio.com).'
        );
        
        const isMensajeValid = validateInput(
            document.getElementById('mensaje'), 
            mensajeRegex, 
            'Tu mensaje debe tener al menos 15 caracteres.'
        );

        // Si todos los campos son válidos
        if (isNombreValid && isEmailValid && isMensajeValid) {
            
            // Simulación de envío de datos
            console.log("Formulario válido. Simulando envío de datos...");
            
            // Aquí se haría una llamada AJAX real al servidor si tuviéramos backend
            
            alert('¡Mensaje enviado con éxito! Gracias por contactar a Digital Room.');
            
            form.reset(); // Limpiar el formulario
        } else {
            alert('Por favor, corrige los errores en el formulario antes de enviarlo.');
        }
    });

    // ===================================================================
    // 4. VALIDACIÓN EN TIEMPO REAL (EVENTO 'input' o 'blur')
    // ===================================================================

    // Opcional: Validar al perder el foco (blur) para dar feedback inmediato.
    document.getElementById('email').addEventListener('blur', function() {
        validateInput(this, emailRegex, 'Ingresa un correo electrónico válido (ej: usuario@dominio.com).');
    });

    document.getElementById('nombre').addEventListener('blur', function() {
        validateInput(this, nombreRegex, 'El nombre debe tener al menos 3 letras y no puede contener números.');
    });

    document.getElementById('mensaje').addEventListener('blur', function() {
        validateInput(this, mensajeRegex, 'Tu mensaje debe tener al menos 15 caracteres.');
    });
});