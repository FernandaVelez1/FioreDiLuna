// Selección de contenido
/*
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

// Añadir texto a notas (ejemplo)
document.getElementById('notas-texto').textContent = "Detalles de tu creación. Estas notas se guardarán con tu pedido.";

*/
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del formulario
    const esenciaSelect = document.querySelector('.esencia-select');
    const contenidoBtns = document.querySelectorAll('.contenido-btn');
    const intensidadCuadros = document.querySelectorAll('.intensidad-cuadro');
    const notasTexto = document.getElementById('notas-texto');
    
    // Texto inicial
    const textoInicial = "Detalles de tu creación. Estas notas se guardarán con tu pedido.";
    notasTexto.textContent = textoInicial;
    
    // Variable para controlar si es la primera interacción
    let primeraInteraccion = true;
    
    // Función para actualizar las notas
    function actualizarNotas() {
        // Si es la primera interacción, cambiar el formato
        if (primeraInteraccion) {
            primeraInteraccion = false;
            notasTexto.innerHTML = `
                <strong>Detalles de tu creación:</strong><br>
                <div class="detalle-linea">
                    <span class="detalle-etiqueta">Esencia:</span> ${esenciaSelect.value}<br>
                    <span class="detalle-etiqueta">Contenido:</span> ${document.querySelector('.contenido-btn.active').textContent}<br>
                    <span class="detalle-etiqueta">Intensidad:</span> ${document.querySelectorAll('.intensidad-cuadro.active').length}/5
                </div>
            `;
        } else {
            // Actualizar normalmente después de la primera interacción
            const esencia = esenciaSelect.value;
            const contenido = document.querySelector('.contenido-btn.active').textContent;
            const intensidad = document.querySelectorAll('.intensidad-cuadro.active').length;
            
            notasTexto.innerHTML = `
                <strong>Detalles de tu creación:</strong><br>
                <div class="detalle-linea">
                    <span class="detalle-etiqueta">Esencia:</span> ${esencia}<br>
                    <span class="detalle-etiqueta">Contenido:</span> ${contenido}<br>
                    <span class="detalle-etiqueta">Intensidad:</span> ${intensidad}/5
                </div>
            `;
        }
    }
    
    // Selección de contenido
    contenidoBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.contenido-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            actualizarNotas();
        });
    });
    
    // Selección de intensidad
    intensidadCuadros.forEach((cuadro, index) => {
        cuadro.addEventListener('click', function() {
            intensidadCuadros.forEach((c, i) => {
                if (i <= index) {
                    c.classList.add('active');
                } else {
                    c.classList.remove('active');
                }
            });
            actualizarNotas();
        });
    });
    
    // Cambio en selección de esencia
    esenciaSelect.addEventListener('change', actualizarNotas);
    
    // Inicializar valores por defecto (sin activar actualización)
    contenidoBtns[0].classList.add('active');
    intensidadCuadros[0].classList.add('active');
});