/**
 * Archivo: js/main.js
 * Funcionalidad: Implementación de JavaScript moderno (DOM, Eventos, AJAX, LocalStorage, y Control de Tema).
 */

(function() {
    "use strict"; 

    // ===================================================================
    // 1. VARIABLES GLOBALES y CONFIGURACIÓN INICIAL
    // ===================================================================

    // Arreglo de objetos simulando la base de datos de juegos
    const juegosDestacados = [
        { id: 1, nombre: "Cyberpunk 2077", plataforma: "Steam", precio: 59.99, oferta: true, imagen: "assets/cpunk.jpg" },
        { id: 2, nombre: "Elden Ring", plataforma: "Epic Games", precio: 49.99, oferta: false, imagen: "assets/elden.jpg" },
        { id: 3, nombre: "Starfield", plataforma: "Steam", precio: 69.99, oferta: true, imagen: "assets/starfield.jpg" },
        { id: 4, nombre: "Hogwarts Legacy", plataforma: "Steam", precio: 34.99, oferta: false, imagen: "assets/hogwarts.jpg" }
    ];

    // Variables globales para el manejo del DOM
    const juegosContainer = document.getElementById('juegos-container');
    const botonCatalogo = document.getElementById('ver-catalogo');
    const botonCargarNovedades = document.getElementById('cargar-novedades');
    const themeToggle = document.getElementById('theme-toggle'); // Nuevo botón de tema
    const htmlElement = document.documentElement; // La etiqueta <html>

    // Almacenamiento Local (LocalStorage)
    const totalCarritoKey = 'digitalRoomCarrito';
    let totalCarrito = parseFloat(localStorage.getItem(totalCarritoKey)) || 0;
    const themeKey = 'digitalRoomTheme';

    // ===================================================================
    // 2. CONTROL DEL TEMA (DOM DINÁMICO y LocalStorage)
    // ===================================================================

    function initializeTheme() {
        // Cargar la preferencia del tema, si no hay, usa 'dark' por defecto.
        const savedTheme = localStorage.getItem(themeKey) || 'dark';
        setTheme(savedTheme);
    }

    function setTheme(theme) {
        // 1. Modificación del DOM (data-theme)
        htmlElement.setAttribute('data-theme', theme);
        // 2. Almacenamiento Local (Guardar preferencia)
        localStorage.setItem(themeKey, theme);
        // 3. Actualización del icono del botón
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙'; 
    }

    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }

    // ===================================================================
    // 3. FUNCIÓN PARA DIBUJAR LOS JUEGOS
    // ===================================================================

    function renderizarJuegos(juegos) {
        const htmlJuegos = juegos.map(juego => {
            const { nombre, plataforma, precio, oferta, imagen, id } = juego;

            const precioVenta = oferta ? (precio * 0.75) : precio;
            const precioDisplay = oferta 
                ? `<del>$${precio.toFixed(2)}</del> <span class="precio-oferta">$${precioVenta.toFixed(2)}</span>` 
                : `$${precio.toFixed(2)}`;
            const ofertaEtiqueta = oferta ? '<span class="etiqueta-oferta">¡Oferta!</span>' : '';

            return `
                <div class="tarjeta-juego" data-id="${id}">
                    <div class="imagen-juego" style="background-image: url('${imagen}');">
                        ${ofertaEtiqueta}
                    </div>
                    <h4>${nombre}</h4>
                    <p>Plataforma: <strong>${plataforma}</strong></p>
                    <p class="precio" data-precio="${precioVenta.toFixed(2)}">${precioDisplay}</p>
                    <button class="btn-comprar">Comprar</button>
                </div>
            `;
        }).join('');

        juegosContainer.innerHTML = htmlJuegos;
    }

    // ===================================================================
    // 4. EVENTOS Y AJAX
    // ===================================================================

    // Evento principal: Ejecución al cargar el DOM
    document.addEventListener('DOMContentLoaded', () => {
        initializeTheme(); // Cargar el tema al inicio
        renderizarJuegos(juegosDestacados);

        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme); // Evento para el botón de tema
        }
    });

    // Evento de click en el botón "Explorar Catálogo"
    if (botonCatalogo) {
        botonCatalogo.addEventListener('click', () => {
            document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Lógica AJAX (Función y Evento, como ya se definió)
    async function cargarNovedadesAsincronicas() {
        // ... (código AJAX omitido por brevedad, es el mismo del paso anterior) ...
        const novedadesContenido = document.getElementById('novedades-contenido');
        novedadesContenido.innerHTML = "Cargando novedades... 🔄";
        
        await new Promise(resolve => setTimeout(resolve, 2000)); 

        const datosNuevos = {
            titulo: "Últimas Novedades del Servidor",
            fecha: new Date().toLocaleDateString('es-ES'),
            items: [
                "Descuento especial del 30% en títulos de terror.",
                "¡Lanzamiento de 'Galaxy Drifter 3' confirmado!",
                "Actualización del motor gráfico para todos los títulos antiguos."
            ]
        };
        
        return datosNuevos;
    }

    if (botonCargarNovedades) {
        botonCargarNovedades.addEventListener('click', async () => {
            const novedadesContenido = document.getElementById('novedades-contenido');
            try {
                const datos = await cargarNovedadesAsincronicas();
                
                let html = `<h4>${datos.titulo}</h4><p>Fecha: ${datos.fecha}</p><ul>`;
                datos.items.forEach(item => {
                    html += `<li>${item}</li>`;
                });
                html += `</ul><p class="small">Datos cargados de forma asíncrona. ✅</p>`;

                novedadesContenido.innerHTML = html;
                botonCargarNovedades.disabled = true; 

            } catch (error) {
                console.error("Error al cargar novedades:", error);
                novedadesContenido.innerHTML = "Hubo un error al cargar la información.";
            }
        });
    }

    // Lógica del carrito (LocalStorage y Event Delegation)
    function actualizarCarrito(monto) {
        totalCarrito += monto;
        localStorage.setItem(totalCarritoKey, totalCarrito.toFixed(2));
        console.log(`Carrito actualizado. Total: $${totalCarrito.toFixed(2)}`);
        alert(`Juego añadido. Total en carrito: $${totalCarrito.toFixed(2)}`);
    }

    if (juegosContainer) {
        juegosContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn-comprar')) {
                const tarjeta = event.target.closest('.tarjeta-juego');
                const precioString = tarjeta.querySelector('.precio').getAttribute('data-precio');
                const precioCompra = parseFloat(precioString);
                
                if (!isNaN(precioCompra)) {
                    actualizarCarrito(precioCompra);
                }
            }
        });
    }
    
})();