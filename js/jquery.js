

 // haciendo uso de de la librería jQuery (Frameworks JS).

// Usamos el shorthand de jQuery para asegurar que el código se ejecute después de que el DOM esté listo
$(function() {

    console.log("jQuery ha sido cargado y el DOM está listo.");

  
    // datos predefinidos para la Sección de Recomendados
   

    const juegosRecomendadosData = [
        { id: 101, nombre: "God of War Ragnarök", plataforma: "Steam/Epic", precio: 49.99, imagen: "assets/gow.jpg" },
        { id: 102, nombre: "Resident Evil 4 Remake", plataforma: "Steam", precio: 39.99, imagen: "assets/re4.jpg" }
    ];
   
 
    //  cargamos los Juegos con jQuery
   

    function renderizarRecomendados() {
        const $container = $('#recomendados-container'); // Selector jQuery
        $container.empty(); // Limpiar por si acaso

        $.each(juegosRecomendadosData, function(index, juego) {
            // Creación de elementos con sintaxis de jQuery
            const $tarjeta = $('<div>', {
                'class': 'tarjeta-juego',
                'data-id': juego.id,
                // Al inicio, la opacidad es 0 para el efecto fade
                'css': { 'opacity': 0 } 
            });

            // Contenido HTML de la tarjeta
            const contenido = `
                <div class="imagen-juego" style="background-image: url('${juego.imagen}');"></div>
                <h4>${juego.nombre}</h4>
                <p>Plataforma: <strong>${juego.plataforma}</strong></p>
                <p class="precio">$${juego.precio.toFixed(2)}</p>
                <button class="btn-comprar-jq">Añadir con JQ</button>
            `;
            
            $tarjeta.html(contenido);
            
            // Inyectar la tarjeta en el contenedor
            $container.append($tarjeta);
            
            //  diseño visual con metodos de JQUERY: .delay() y .animate() o .fadeIn() 
            
            $tarjeta.delay(index * 200).animate({ opacity: 1 }, 500); 
        });
    }

    //  se ejecuta la función al inicio
    renderizarRecomendados();


   
    // eventos con JQuERY
   

    // eventos jQuery para los botones de la sección
    // el botón que tiene la clase .btn-comprar-jq es para diferenciarlo del JS moderno.
    $('#recomendados-container').on('click', '.btn-comprar-jq', function() {
        
        // El .closest() busca el ancestro más cercano con la clase especificada.
        const idJuego = $(this).closest('.tarjeta-juego').data('id');
        const nombreJuego = $(this).siblings('h4').text();

        // efecto visual de saltos o vibración al botón (manipulando CSS con jQuery)
        $(this).css({ 'background-color': '#f59e0b' })
               .animate({ opacity: 0.5 }, 100)
               .animate({ opacity: 1 }, 100)
               .css({ 'background-color': '#1e3a8a' }); // Volver al color original

        alert(`¡Juego ${nombreJuego} (ID: ${idJuego}) añadido al carrito! (Acción JQuery)`);

        
    });

});