document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const seccionEnvase = document.querySelector('.personaliza-envase');
    const seccionResumen = document.querySelector('.resumen-perfume');
    let seccionAnterior = null;
    let mlSeleccionadosAroma1 = '50ml';
    let seccionAromasOriginal = document.querySelector('.elige-aromas');
    let seccionesAromas = [seccionAromasOriginal]; // Array para rastrear todas las secciones de aromas
    

    // Precios por tamaño
    const preciosPorTamaño = {
        '50ml': 0,
        '100ml': 300,
        '150ml': 500,
        '200ml': 700
    };
    
    // Función para calcular el total de ml seleccionados
    function calcularTotalML() {
        let totalML = 0;
        seccionesAromas.forEach(seccion => {
            const contenidoBtn = seccion.querySelector('.contenido-btn.active');
            if (contenidoBtn && contenidoBtn.style.display !== 'none') {
                const ml = parseInt(contenidoBtn.textContent.toLowerCase().replace('ml', '').trim());
                totalML += ml;
            }
        });
        return totalML;
    }
    
    // Función para filtrar los frascos según el total de ml
    function filtrarFrascosPorML() {
        const totalML = calcularTotalML();
        const envaseSelect = document.querySelector('.envase-select');
        if (!envaseSelect) return;
        
        // Mostrar/ocultar opciones según el total de ml
        for (let i = 0; i < envaseSelect.options.length; i++) {
            const option = envaseSelect.options[i];
            const optionML = parseInt(option.getAttribute('data-ml'));
            
            // Mostrar solo los frascos que coincidan con el total de ml
            option.style.display = (optionML === totalML) ? '' : 'none';
        }
        
        // Seleccionar la primera opción visible
        for (let i = 0; i < envaseSelect.options.length; i++) {
            if (envaseSelect.options[i].style.display !== 'none') {
                envaseSelect.selectedIndex = i;
                break;
            }
        }
        
        // Forzar la actualización del envase
        const event = new Event('change');
        envaseSelect.dispatchEvent(event);
    }

    // Función para manejar el botón "Añadir otro aroma"
    function manejarBotonAgregar() {
        const agregarBtn = document.querySelector('.agregar-btn');
        if (!agregarBtn) return;
        
        // Ocultar/mostrar según la selección de ml en el primer aroma
        agregarBtn.style.display = (mlSeleccionadosAroma1 === '200ml') ? 'none' : '';
    }

    // Función para actualizar opciones de ml en aroma 2
    function actualizarOpcionesML() {
        if (seccionesAromas.length < 2) return;

        const seccionAroma2 = seccionesAromas[1];
        const botonesML = seccionAroma2.querySelectorAll('.contenido-btn');
        const opcionesContenido = seccionAroma2.querySelector('.contenido-opciones');
        
        if (mlSeleccionadosAroma1 === '50ml') {
            botonesML.forEach(boton => {
                const ml = boton.textContent.toLowerCase().replace(' ', '');
                boton.style.display = (ml === '200ml') ? 'none' : '';
            });
        } else if (mlSeleccionadosAroma1 === '100ml') {
            botonesML.forEach(boton => {
                const ml = boton.textContent.toLowerCase().replace(' ', '');
                boton.style.display = (ml === '150ml' || ml === '200ml') ? 'none' : '';
            });
        } else if (mlSeleccionadosAroma1 === '150ml') {
            botonesML.forEach(boton => {
                const ml = boton.textContent.toLowerCase().replace(' ', '');
                boton.style.display = (ml !== '50ml') ? 'none' : '';
            });
        } else if (mlSeleccionadosAroma1 === '200ml') {
            if (opcionesContenido) opcionesContenido.style.display = 'none';
        }
        
        const primerBotonVisible = seccionAroma2.querySelector('.contenido-btn[style=""]');
        if (primerBotonVisible) {
            seccionAroma2.querySelectorAll('.contenido-btn').forEach(b => b.classList.remove('active'));
            primerBotonVisible.classList.add('active');
        }
        
        // Actualizar filtro de frascos cuando cambian los ml
        filtrarFrascosPorML();
    }

    // Función para inicializar sección de aromas
    function inicializarSeccionAromas(section, esPrimeraSeccion = false, esCopia = false) {
        const esenciaSelect = section.querySelector('.esencia-select');
        const contenidoBtns = section.querySelectorAll('.contenido-btn');
        const precioValor = section.querySelector('.precio-valor');
        const aromaImagen = section.querySelector('.aromas-imagen img');
        let ultimaEsencia = esenciaSelect ? esenciaSelect.value : '';
        
        function actualizarPrecio() {
            const opcionSeleccionada = esenciaSelect.options[esenciaSelect.selectedIndex];
            const precioBase = parseInt(opcionSeleccionada.getAttribute('data-precio-base'));
            
            let tamañoSeleccionado = '50ml';
            section.querySelectorAll('.contenido-btn').forEach(btn => {
                if (btn.classList.contains('active') && btn.style.display !== 'none') {
                    tamañoSeleccionado = btn.textContent.toLowerCase().replace(' ', '');
                }
            });
            
            const incremento = preciosPorTamaño[tamañoSeleccionado] || 0;
            const precioTotal = precioBase + incremento;
            
            if (precioValor) {
                precioValor.textContent = `$ ${precioTotal.toLocaleString('es-MX')}.00 MXN`;
            }
            
            if (esPrimeraSeccion) {
                mlSeleccionadosAroma1 = tamañoSeleccionado;
                actualizarOpcionesML();
                manejarBotonAgregar(); // Actualizar visibilidad del botón
            }
            
            // Actualizar filtro de frascos cuando cambian los ml
            filtrarFrascosPorML();
        }
        
        function actualizarImagen() {
            const opcionSeleccionada = esenciaSelect.options[esenciaSelect.selectedIndex];
            const imagen = opcionSeleccionada.getAttribute('data-imagen');
            const nuevaEsencia = esenciaSelect.value;
            
            if (nuevaEsencia !== ultimaEsencia && aromaImagen) {
                ultimaEsencia = nuevaEsencia;
                aromaImagen.classList.add('cambiando');
                setTimeout(() => {
                    if (imagen) {
                        aromaImagen.src = `esencias/${imagen}`;
                        aromaImagen.alt = opcionSeleccionada.text;
                    }
                    aromaImagen.classList.remove('cambiando');
                }, 300);
            }
        }
        
        if (esenciaSelect) {
            // Si es una copia, establecer Cereza Negra como predeterminado
            if (esCopia) {
                for (let i = 0; i < esenciaSelect.options.length; i++) {
                    if (esenciaSelect.options[i].text === 'Cereza Negra') {
                        esenciaSelect.selectedIndex = i;
                        break;
                    }
                }
                
                // Actualizar la imagen inmediatamente
                const opcionSeleccionada = esenciaSelect.options[esenciaSelect.selectedIndex];
                const imagen = opcionSeleccionada.getAttribute('data-imagen') || 'imagen1.png';
                if (aromaImagen) {
                    aromaImagen.src = `esencias/${imagen}`;
                    aromaImagen.alt = opcionSeleccionada.text;
                }
            }
            
            esenciaSelect.addEventListener('change', function() {
                actualizarImagen();
                actualizarPrecio();
            });
        }
        
        if (contenidoBtns) {
            contenidoBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    if (this.style.display === 'none') return;
                    section.querySelectorAll('.contenido-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    actualizarPrecio();
                });
            });
        }
        
        actualizarImagen();
        actualizarPrecio();
        
        section.querySelectorAll('.intensidad-cuadro').forEach((cuadro, index) => {
            cuadro.addEventListener('click', function() {
                section.querySelectorAll('.intensidad-cuadro').forEach((c, i) => {
                    if (i <= index) c.classList.add('active');
                    else c.classList.remove('active');
                });
            });
        });
    }

    // Función para manejar los cambios en el envase
    function manejarSeleccionEnvase() {
        const envaseSelect = document.querySelector('.envase-select');
        const envaseImagen = document.querySelector('.envase-imagen img');
        const coloresOpciones = document.querySelector('.colores-opciones');
        const precioEnvase = document.querySelector('.personaliza-envase .precio-valor');
        
        function actualizarEnvase() {
            const opcionSeleccionada = envaseSelect.options[envaseSelect.selectedIndex];
            const imagen = opcionSeleccionada.getAttribute('data-imagen');
            const precio = opcionSeleccionada.getAttribute('data-precio');
            const colores = opcionSeleccionada.getAttribute('data-colores').split(',');
            
            // Actualizar imagen con animación
            if (imagen && envaseImagen) {
                // Aplicar clase de transición
                envaseImagen.classList.add('cambiando');
                
                // Esperar a que termine la animación de desvanecimiento
                setTimeout(() => {
                    envaseImagen.src = `frascos/${imagen}`;
                    envaseImagen.alt = opcionSeleccionada.text;
                    
                    // Remover clase de transición después de cambiar la imagen
                    setTimeout(() => {
                        envaseImagen.classList.remove('cambiando');
                    }, 10);
                }, 300); // Este tiempo debe coincidir con la duración de la transición en CSS
            }
            
            // Actualizar precio
            if (precio && precioEnvase) {
                precioEnvase.textContent = `$${parseInt(precio).toLocaleString('es-MX')}.00 MXN`;
            }
            
            // Actualizar colores
            if (coloresOpciones) {
                coloresOpciones.innerHTML = '';
                colores.forEach(color => {
                    const colorCirculo = document.createElement('div');
                    colorCirculo.className = 'color-circulo';
                    colorCirculo.style.backgroundColor = color;
                    colorCirculo.setAttribute('data-color', color);
                    colorCirculo.addEventListener('click', function() {
                        document.querySelectorAll('.color-circulo').forEach(c => c.classList.remove('selected'));
                        this.classList.add('selected');
                    });
                    coloresOpciones.appendChild(colorCirculo);
                });
                
                // Seleccionar el primer color por defecto
                if (coloresOpciones.firstChild) {
                    coloresOpciones.firstChild.classList.add('selected');
                }
            }
        }
        
        // Escuchar cambios en el select
        if (envaseSelect) {
            envaseSelect.addEventListener('change', actualizarEnvase);
            
            // Inicializar al cargar
            actualizarEnvase();
        }
    }

    function navigateToEnvaseSection(currentSection) {
        seccionAnterior = currentSection;
        currentSection.style.opacity = '0';
        currentSection.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            currentSection.style.display = 'none';
            seccionEnvase.style.display = 'block';
            
            // Filtrar frascos al cambiar a esta sección
            filtrarFrascosPorML();
            
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
                        
                        // Determinar a qué sección debemos regresar
                        let seccionARegresar;
                        if (seccionesAromas.length > 1) {
                            // Si hay más de una sección de aromas, regresar a la última
                            seccionARegresar = seccionesAromas[seccionesAromas.length - 1];
                        } else {
                            // Si solo hay una, regresar a la original
                            seccionARegresar = seccionAromasOriginal;
                        }
                        
                        seccionARegresar.style.display = 'block';
                        setTimeout(() => {
                            seccionARegresar.style.opacity = '1';
                            seccionARegresar.style.transform = 'translateY(0)';
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

    function navigateToResumenSection(currentSection) {
        seccionAnterior = currentSection;
        const aromasSeleccionados = obtenerAromasSeleccionados();
        const envaseSeleccionado = obtenerEnvaseSeleccionado();
        const colorSeleccionado = obtenerColorSeleccionado();
        const frasePersonalizada = obtenerFrasePersonalizada();

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

    function obtenerAromasSeleccionados() {
        const aromas = [];
        seccionesAromas.forEach(seccion => {
            const esenciaSelect = seccion.querySelector('.esencia-select');
            const contenidoBtn = seccion.querySelector('.contenido-btn.active');
            const intensidad = seccion.querySelectorAll('.intensidad-cuadro.active').length;
            
            if (esenciaSelect && contenidoBtn && contenidoBtn.style.display !== 'none') {
                const opcionSeleccionada = esenciaSelect.options[esenciaSelect.selectedIndex];
                const precioBase = parseInt(opcionSeleccionada.getAttribute('data-precio-base'));
                const tamaño = contenidoBtn.textContent.toLowerCase().replace(' ', '');
                const incremento = preciosPorTamaño[tamaño] || 0;
                const precioTotal = precioBase + incremento;
                
                aromas.push({
                    nombre: opcionSeleccionada.text,
                    contenido: contenidoBtn.textContent,
                    intensidad: intensidad,
                    precio: precioTotal
                });
            }
        });
        return aromas;
    }

    function obtenerEnvaseSeleccionado() {
        const envaseSelect = document.querySelector('.envase-select');
        return envaseSelect ? {
            nombre: envaseSelect.options[envaseSelect.selectedIndex].text,
            precio: parseInt(envaseSelect.options[envaseSelect.selectedIndex].getAttribute('data-precio')),
            ml: parseInt(envaseSelect.options[envaseSelect.selectedIndex].getAttribute('data-ml'))
        } : { nombre: '', precio: 0, ml: 0 };
    }

    function obtenerColorSeleccionado() {
        const colorCirculo = document.querySelector('.color-circulo.selected');
        return colorCirculo ? colorCirculo.getAttribute('data-color') : '';
    }

    function obtenerFrasePersonalizada() {
        const fraseInput = document.querySelector('.frase-input');
        return fraseInput ? fraseInput.value : '';
    }

    function actualizarResumen(aromas, envase, color, frase) {
        const resumenDetails = document.querySelector('.resumen-details');
        const totalPrice = document.querySelector('.total-price1');
        
        let aromasHTML = aromas.map((aroma, index) => 
            `<div class="resumen-item">
                <p><strong>Aroma ${index + 1}:</strong> ${aroma.nombre} (${aroma.contenido}) - Intensidad: ${aroma.intensidad}/5</p>
                <p class="item-price">$${aroma.precio.toLocaleString('es-MX')}.00 MXN</p>
            </div>`
        ).join('');
        
        let envaseHTML = `
            <div class="resumen-item">
                <p><strong>Envase:</strong> ${envase.nombre} (${envase.ml}mL) ${color ? `- <span class="color-muestra" style="background-color: ${color};"></span>` : ''}</p>
                <p class="item-price">$${envase.precio.toLocaleString('es-MX')}.00 MXN</p>
            </div>`;
        
        let fraseHTML = frase ? `
            <div class="resumen-item">
                <p><strong>Frase personalizada:</strong> "${frase}"</p>
            </div>` : '';
        
        const total = aromas.reduce((sum, aroma) => sum + aroma.precio, 0) + envase.precio;
        resumenDetails.innerHTML = `${aromasHTML}${envaseHTML}${fraseHTML}`;
        
        if (totalPrice) {
            totalPrice.textContent = `$ ${total.toLocaleString('es-MX')}.00 MXN`;
        }
    }

    document.querySelector('.siguiente-btn')?.addEventListener('click', function() {
        const seccionAromas = document.querySelector('.elige-aromas');
        if (seccionEnvase.style.display !== 'block') {
            navigateToEnvaseSection(seccionAromas);
        }
    });

    document.querySelector('.agregar-btn')?.addEventListener('click', function() {
        const originalSection = document.querySelector('.elige-aromas');
        originalSection.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        originalSection.style.opacity = '0';
        originalSection.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            originalSection.style.display = 'none';
            const clonedSection = originalSection.cloneNode(true);
            clonedSection.classList.add('aroma-copia');
            
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
                        // Eliminar esta sección del array
                        seccionesAromas = seccionesAromas.filter(sec => sec !== clonedSection);
                        clonedSection.remove();
                        
                        // Mostrar la sección anterior
                        originalSection.style.display = 'block';
                        originalSection.style.opacity = '0';
                        originalSection.style.transform = 'translateY(-20px)';
                        void originalSection.offsetWidth;
                        originalSection.style.opacity = '1';
                        originalSection.style.transform = 'translateY(0)';
                        manejarBotonAgregar();
                    }, 300);
                });
            }
            
            const contenidoBtns = clonedSection.querySelectorAll('.contenido-btn');
            if (contenidoBtns.length > 0) {
                contenidoBtns.forEach(btn => {
                    btn.classList.remove('active');
                    btn.style.display = '';
                });
                contenidoBtns[0].classList.add('active');
            }
            
            clonedSection.querySelectorAll('.intensidad-cuadro').forEach(c => c.classList.remove('active'));
            const esenciaSelect = clonedSection.querySelector('.esencia-select');
            if (esenciaSelect) esenciaSelect.selectedIndex = 0;
            
            clonedSection.style.opacity = '0';
            clonedSection.style.transform = 'translateY(-20px)';
            clonedSection.style.display = 'block';
            clonedSection.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            originalSection.parentNode.insertBefore(clonedSection, originalSection.nextSibling);
            void clonedSection.offsetWidth;
            clonedSection.style.opacity = '1';
            clonedSection.style.transform = 'translateY(0)';
            
            // Agregar la nueva sección al array
            seccionesAromas.push(clonedSection);
            
            // Inicializar como sección copia (establecerá Cereza Negra como predeterminado)
            inicializarSeccionAromas(clonedSection, false, true);
            actualizarOpcionesML();
            
            const clonedNextBtn = clonedSection.querySelector('.siguiente-btn:not(.regresar-btn)');
            if (clonedNextBtn) {
                clonedNextBtn.addEventListener('click', function() {
                    navigateToEnvaseSection(clonedSection);
                });
            }
        }, 300);
    });

    // Inicializar secciones
    inicializarSeccionAromas(seccionAromasOriginal, true);
    manejarBotonAgregar();
    manejarSeleccionEnvase();

    // Función para preparar el item del carrito
function prepararItemParaCarrito() {
    const nombrePerfume = document.querySelector('.nombre-perfume-input').value || 'Perfume Personalizado';
    const aromas = obtenerAromasSeleccionados();
    const envase = obtenerEnvaseSeleccionado();
    const color = obtenerColorSeleccionado();
    const frase = obtenerFrasePersonalizada();
    
    // Calcular precio total
    const precioTotal = aromas.reduce((sum, aroma) => sum + aroma.precio, 0) + envase.precio;
    
    // Crear descripción detallada
    let descripcion = 'Aromas: ';
    descripcion += aromas.map((aroma, index) => 
        `${aroma.nombre} (${aroma.contenido}, Intensidad ${aroma.intensidad}/5)`
    ).join(' + ');
    
    descripcion += ` | Envase: ${envase.nombre} (${envase.ml}ml)`;
    if (color) descripcion += `, Color: ${color}`;
    if (frase) descripcion += ` | Frase: "${frase}"`;
    
    return {
        id: 'perfume-' + Date.now(), // ID único
        name: nombrePerfume,
        description: descripcion,
        price: precioTotal,
        quantity: 1,
        image: envase.nombre.includes('Incanto') ? 'frascos/1.png' : 'frascos/2.png' // Ejemplo, ajusta según tus imágenes
    };
}

// Event listener para el botón "Guardar en la Bolsa"
document.querySelector('.bolsa-btn')?.addEventListener('click', function() {
    const nombreInput = document.querySelector('.nombre-perfume-input');
    const nombrePerfume = nombreInput.value.trim();
    
    // Validación más estricta
    if (!nombrePerfume || nombrePerfume.length < 2) {
        alert('Por favor, asigna un nombre único a tu perfume');
        nombreInput.focus();
        nombreInput.style.border = '1px solid red'; // Resaltar campo inválido
        setTimeout(() => {
            nombreInput.style.border = ''; // Quitar resaltado después de 2 segundos
        }, 2000);
        return; // Esto detiene la ejecución, no llegará a addToCart
    }
    
    const perfumeItem = prepararItemParaCarrito();
    addToCart(perfumeItem);
    
    // Mostrar mensaje de confirmación estilizado
    confirmationMessage.style.display = 'block';
    setTimeout(() => {
        confirmationMessage.style.display = 'none';
    }, 3000);
});

});