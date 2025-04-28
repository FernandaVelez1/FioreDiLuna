document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const seccionEnvase = document.querySelector('.personaliza-envase');
    
    // Selección de contenido
    document.querySelectorAll('.contenido-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.contenido-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Selección de intensidad
    document.querySelectorAll('.intensidad-cuadro').forEach((cuadro, index) => {
        cuadro.addEventListener('click', function() {
            document.querySelectorAll('.intensidad-cuadro').forEach((c, i) => {
                if (i <= index) {
                    c.classList.add('active');
                } else {
                    c.classList.remove('active');
                }
            });
        });
    });

    // Función para mostrar notificación del carrito
    function mostrarNotificacionCarrito() {
        // Crear la notificación si no existe
        let notificacion = document.querySelector('.notificacion-carrito');
        if (!notificacion) {
            notificacion = document.createElement('div');
            notificacion.className = 'notificacion-carrito';
            notificacion.innerHTML = `
                <i class="bi bi-check-circle-fill"></i>
                <span>Aromas guardados en la bolsa de compras</span>
            `;
            document.body.appendChild(notificacion);
        }
        
        // Mostrar la notificación
        notificacion.classList.add('mostrar');
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            notificacion.classList.remove('mostrar');
            // Eliminar el elemento después de la animación
            setTimeout(() => {
                notificacion.remove();
            }, 500);
        }, 3000);
    }

    // Función para navegar a la sección de envase
    function navigateToEnvaseSection(currentSection) {
        // Mostrar notificación del carrito
        mostrarNotificacionCarrito();
        
        // Animación de salida de la sección actual
        currentSection.style.opacity = '0';
        currentSection.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            currentSection.style.display = 'none';
            
            // Mostrar la sección de envase con animación
            seccionEnvase.style.display = 'block';
            setTimeout(() => {
                seccionEnvase.style.opacity = '1';
                seccionEnvase.style.transform = 'translateY(0)';
            }, 10);
            
            // Cambiar el texto del botón siguiente en la nueva sección
            const finalizarBtn = seccionEnvase.querySelector('.finalizar-btn');
            if (finalizarBtn) {
                finalizarBtn.innerHTML = 'Tu Obra Maestra <i class="bi bi-arrow-right"></i>';
            }
            
            // Configurar evento para el botón regresar
            const botonRegresar = seccionEnvase.querySelector('.regresar-btn');
            if (botonRegresar) {
                botonRegresar.addEventListener('click', function() {
                    // Animación de salida de la sección de envase
                    seccionEnvase.style.opacity = '0';
                    seccionEnvase.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        seccionEnvase.style.display = 'none';
                        currentSection.style.display = 'block';
                        setTimeout(() => {
                            currentSection.style.opacity = '1';
                            currentSection.style.transform = 'translateY(0)';
                        }, 10);
                    }, 500);
                });
            }
        }, 500);
    }

    // Evento para el botón siguiente original
    document.querySelector('.siguiente-btn').addEventListener('click', function() {
        const seccionAromas = document.querySelector('.elige-aromas');
        if (seccionEnvase.style.display !== 'block') {
            navigateToEnvaseSection(seccionAromas);
        }
    });

    // Función para crear nueva sección con transición mejorada
    document.querySelector('.agregar-btn').addEventListener('click', function() {
        const originalSection = document.querySelector('.elige-aromas');
        
        // 1. Aplicar animación de salida más sutil a la sección actual
        originalSection.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        originalSection.style.opacity = '0';
        originalSection.style.transform = 'translateY(20px)';
        
        // 2. Después de que termine la animación, crear la nueva sección
        setTimeout(() => {
            // Ocultar completamente la sección original
            originalSection.style.display = 'none';
            
            // Clonar la sección
            const clonedSection = originalSection.cloneNode(true);
            
            // Eliminar el botón "Añadir otro aroma" del clon
            const agregarBtn = clonedSection.querySelector('.agregar-btn');
            if (agregarBtn) agregarBtn.remove();
            
            // Ajustar el contenedor de precio
            const precioContainer = clonedSection.querySelector('.precio-agregar-container');
            if (precioContainer && precioContainer.querySelector('.agregar-btn')) {
                precioContainer.querySelector('.agregar-btn').remove();
            }
            
            // Crear y agregar botón "Regresar"
            const botonSiguienteContainer = clonedSection.querySelector('.boton-siguiente-container');
            if (botonSiguienteContainer) {
                const botonRegresar = document.createElement('button');
                botonRegresar.className = 'siguiente-btn regresar-btn';
                botonRegresar.innerHTML = '<i class="bi bi-arrow-left"></i> Regresar';
                
                // Insertar antes del botón siguiente
                botonSiguienteContainer.insertBefore(botonRegresar, botonSiguienteContainer.firstChild);
                
                // Evento para el botón regresar
                botonRegresar.addEventListener('click', function() {
                    // Animación de salida de la sección actual
                    clonedSection.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    clonedSection.style.opacity = '0';
                    clonedSection.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        clonedSection.remove();
                        // Mostrar la sección original con animación
                        originalSection.style.display = 'block';
                        originalSection.style.opacity = '0';
                        originalSection.style.transform = 'translateY(-20px)';
                        void originalSection.offsetWidth; // Forzar reflow
                        originalSection.style.opacity = '1';
                        originalSection.style.transform = 'translateY(0)';
                    }, 300);
                });
            }
            
            // Reiniciar todos los valores a su estado inicial
            resetSelection(clonedSection);
            
            // Establecer estilos iniciales para la animación de entrada
            clonedSection.style.opacity = '0';
            clonedSection.style.transform = 'translateY(-20px)';
            clonedSection.style.display = 'block';
            clonedSection.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            
            // Insertar el clon en el mismo lugar que la original
            originalSection.parentNode.insertBefore(clonedSection, originalSection.nextSibling);
            
            // Forzar el reflow para que la animación funcione
            void clonedSection.offsetWidth;
            
            // Animar la entrada de la nueva sección
            clonedSection.style.opacity = '1';
            clonedSection.style.transform = 'translateY(0)';
            
            // Reasignar eventos a los elementos clonados
            reassignEvents(clonedSection);
            
            // Configurar el botón siguiente en el clon
            const clonedNextBtn = clonedSection.querySelector('.siguiente-btn:not(.regresar-btn)');
            if (clonedNextBtn) {
                clonedNextBtn.addEventListener('click', function() {
                    navigateToEnvaseSection(clonedSection);
                });
            }
            
        }, 300); // Tiempo igual a la duración de la animación
    });

    // Función para reasignar eventos a elementos clonados
    function reassignEvents(section) {
        // Reasignar eventos de botones de contenido
        section.querySelectorAll('.contenido-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                section.querySelectorAll('.contenido-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Reasignar eventos de cuadros de intensidad
        section.querySelectorAll('.intensidad-cuadro').forEach((cuadro, index) => {
            cuadro.addEventListener('click', function() {
                section.querySelectorAll('.intensidad-cuadro').forEach((c, i) => {
                    if (i <= index) {
                        c.classList.add('active');
                    } else {
                        c.classList.remove('active');
                    }
                });
            });
        });
    }

    // Función para reiniciar las selecciones
    function resetSelection(section) {
        // Reiniciar selección de contenido
        const contenidoBtns = section.querySelectorAll('.contenido-btn');
        if (contenidoBtns.length > 0) {
            contenidoBtns.forEach(btn => btn.classList.remove('active'));
            contenidoBtns[0].classList.add('active'); // Seleccionar el primero por defecto
        }
        
        // Reiniciar intensidad
        section.querySelectorAll('.intensidad-cuadro').forEach(c => c.classList.remove('active'));
        
        // Reiniciar selección de esencia
        const esenciaSelect = section.querySelector('.esencia-select');
        if (esenciaSelect) esenciaSelect.selectedIndex = 0;
    }

    // Selección de color con resaltado
    document.querySelectorAll('.color-circulo').forEach(circulo => {
        circulo.addEventListener('click', function() {
            // Remover la clase 'selected' de todos los círculos
            document.querySelectorAll('.color-circulo').forEach(c => {
                c.classList.remove('selected');
            });
            
            // Añadir la clase 'selected' al círculo clickeado
            this.classList.add('selected');
        });
    });

    // Seleccionar primer color por defecto
    document.querySelector('.color-circulo')?.classList.add('selected');
});

//NUEVOOOOOOOOOOOOOOO
