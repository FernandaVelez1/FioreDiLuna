document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const seccionEnvase = document.querySelector('.personaliza-envase');
    const seccionResumen = document.querySelector('.resumen-perfume');
    let seccionAnterior = null; // Para recordar de qué sección venimos
    
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
        
        notificacion.classList.add('mostrar');
        
        setTimeout(() => {
            notificacion.classList.remove('mostrar');
            setTimeout(() => {
                notificacion.remove();
            }, 500);
        }, 3000);
    }

    // Función para navegar a la sección de envase
    function navigateToEnvaseSection(currentSection) {
        mostrarNotificacionCarrito();
        seccionAnterior = currentSection;
        
        currentSection.style.opacity = '0';
        currentSection.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            currentSection.style.display = 'none';
            
            seccionEnvase.style.display = 'block';
            setTimeout(() => {
                seccionEnvase.style.opacity = '1';
                seccionEnvase.style.transform = 'translateY(0)';
            }, 10);
            
            const botonRegresar = seccionEnvase.querySelector('.regresar-btn');
            if (botonRegresar) {
                botonRegresar.addEventListener('click', function() {
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
            
            const finalizarBtn = seccionEnvase.querySelector('.finalizar-btn');
            if (finalizarBtn) {
                finalizarBtn.addEventListener('click', function() {
                    navigateToResumenSection(seccionEnvase);
                });
            }
        }, 500);
    }

    // Función para navegar a la sección de resumen
    function navigateToResumenSection(currentSection) {
        seccionAnterior = currentSection;
        
        // Obtener selecciones
        const aromasSeleccionados = obtenerAromasSeleccionados();
        const envaseSeleccionado = obtenerEnvaseSeleccionado();
        const colorSeleccionado = obtenerColorSeleccionado();
        const frasePersonalizada = obtenerFrasePersonalizada();

        // Actualizar resumen
        actualizarResumen(aromasSeleccionados, envaseSeleccionado, colorSeleccionado, frasePersonalizada);

        currentSection.style.opacity = '0';
        currentSection.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            currentSection.style.display = 'none';
            
            seccionResumen.style.display = 'block';
            setTimeout(() => {
                seccionResumen.style.opacity = '1';
                seccionResumen.style.transform = 'translateY(0)';
            }, 10);
            
            // Configurar botón "Volver a Editar"
            const editarBtn = seccionResumen.querySelector('.editar-btn');
            if (editarBtn) {
                editarBtn.addEventListener('click', function() {
                    seccionResumen.style.opacity = '0';
                    seccionResumen.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        seccionResumen.style.display = 'none';
                        if (seccionAnterior) {
                            seccionAnterior.style.display = 'block';
                            setTimeout(() => {
                                seccionAnterior.style.opacity = '1';
                                seccionAnterior.style.transform = 'translateY(0)';
                            }, 10);
                        }
                    }, 500);
                });
            }
        }, 500);
    }

    // Funciones auxiliares para obtener selecciones
    function obtenerAromasSeleccionados() {
        const aromas = [];
        document.querySelectorAll('.elige-aromas').forEach(seccion => {
            const esenciaSelect = seccion.querySelector('.esencia-select');
            const contenidoBtn = seccion.querySelector('.contenido-btn.active');
            const intensidad = seccion.querySelectorAll('.intensidad-cuadro.active').length;
            
            if (esenciaSelect && contenidoBtn) {
                aromas.push({
                    nombre: esenciaSelect.options[esenciaSelect.selectedIndex].text,
                    contenido: contenidoBtn.textContent,
                    intensidad: intensidad
                });
            }
        });
        return aromas;
    }

    function obtenerEnvaseSeleccionado() {
        const envaseSelect = document.querySelector('.envase-select');
        return envaseSelect ? envaseSelect.options[envaseSelect.selectedIndex].text : '';
    }

    function obtenerColorSeleccionado() {
        const colorCirculo = document.querySelector('.color-circulo.selected');
        return colorCirculo ? colorCirculo.getAttribute('data-color') : '';
    }

    function obtenerFrasePersonalizada() {
        const fraseInput = document.querySelector('.frase-input');
        return fraseInput ? fraseInput.value : '';
    }

    // Función para actualizar el resumen
    function actualizarResumen(aromas, envase, color, frase) {
        const resumenDetails = document.querySelector('.resumen-details');
        
        let aromasHTML = aromas.map((aroma, index) => 
            `<p><strong>Aroma ${index + 1}:</strong> ${aroma.nombre} (${aroma.contenido}) - Intensidad: ${aroma.intensidad}/5</p>`
        ).join('');
        
        let envaseHTML = `<p><strong>Envase:</strong> ${envase}`;
        if (color) {
            envaseHTML += ` <span class="color-muestra" style="background-color: ${color};"></span>`;
        }
        envaseHTML += `</p>`;
        
        let fraseHTML = frase ? `<p><strong>Frase personalizada:</strong> "${frase}"</p>` : '';
        
        resumenDetails.innerHTML = `
            ${aromasHTML}
            ${envaseHTML}
            ${fraseHTML}
        `;
    }

    // Evento para el botón siguiente original
    document.querySelector('.siguiente-btn').addEventListener('click', function() {
        const seccionAromas = document.querySelector('.elige-aromas');
        if (seccionEnvase.style.display !== 'block') {
            navigateToEnvaseSection(seccionAromas);
        }
    });

    // Función para crear nueva sección de aromas
    document.querySelector('.agregar-btn').addEventListener('click', function() {
        const originalSection = document.querySelector('.elige-aromas');
        
        originalSection.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        originalSection.style.opacity = '0';
        originalSection.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            originalSection.style.display = 'none';
            
            const clonedSection = originalSection.cloneNode(true);
            const agregarBtn = clonedSection.querySelector('.agregar-btn');
            if (agregarBtn) agregarBtn.remove();
            
            const precioContainer = clonedSection.querySelector('.precio-agregar-container');
            if (precioContainer && precioContainer.querySelector('.agregar-btn')) {
                precioContainer.querySelector('.agregar-btn').remove();
            }
            
            const botonSiguienteContainer = clonedSection.querySelector('.boton-siguiente-container');
            if (botonSiguienteContainer) {
                const botonRegresar = document.createElement('button');
                botonRegresar.className = 'siguiente-btn regresar-btn';
                botonRegresar.innerHTML = '<i class="bi bi-arrow-left"></i> Regresar';
                
                botonSiguienteContainer.insertBefore(botonRegresar, botonSiguienteContainer.firstChild);
                
                botonRegresar.addEventListener('click', function() {
                    clonedSection.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    clonedSection.style.opacity = '0';
                    clonedSection.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        clonedSection.remove();
                        originalSection.style.display = 'block';
                        originalSection.style.opacity = '0';
                        originalSection.style.transform = 'translateY(-20px)';
                        void originalSection.offsetWidth;
                        originalSection.style.opacity = '1';
                        originalSection.style.transform = 'translateY(0)';
                    }, 300);
                });
            }
            
            resetSelection(clonedSection);
            
            clonedSection.style.opacity = '0';
            clonedSection.style.transform = 'translateY(-20px)';
            clonedSection.style.display = 'block';
            clonedSection.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            
            originalSection.parentNode.insertBefore(clonedSection, originalSection.nextSibling);
            
            void clonedSection.offsetWidth;
            
            clonedSection.style.opacity = '1';
            clonedSection.style.transform = 'translateY(0)';
            
            reassignEvents(clonedSection);
            
            const clonedNextBtn = clonedSection.querySelector('.siguiente-btn:not(.regresar-btn)');
            if (clonedNextBtn) {
                clonedNextBtn.addEventListener('click', function() {
                    navigateToEnvaseSection(clonedSection);
                });
            }
        }, 300);
    });

    // Función para reasignar eventos
    function reassignEvents(section) {
        section.querySelectorAll('.contenido-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                section.querySelectorAll('.contenido-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });

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

    // Función para reiniciar selecciones
    function resetSelection(section) {
        const contenidoBtns = section.querySelectorAll('.contenido-btn');
        if (contenidoBtns.length > 0) {
            contenidoBtns.forEach(btn => btn.classList.remove('active'));
            contenidoBtns[0].classList.add('active');
        }
        
        section.querySelectorAll('.intensidad-cuadro').forEach(c => c.classList.remove('active'));
        
        const esenciaSelect = section.querySelector('.esencia-select');
        if (esenciaSelect) esenciaSelect.selectedIndex = 0;
    }

    // Selección de color
    document.querySelectorAll('.color-circulo').forEach(circulo => {
        circulo.addEventListener('click', function() {
            document.querySelectorAll('.color-circulo').forEach(c => {
                c.classList.remove('selected');
            });
            this.classList.add('selected');
        });
    });

    // Seleccionar primer color por defecto
    document.querySelector('.color-circulo')?.classList.add('selected');
});