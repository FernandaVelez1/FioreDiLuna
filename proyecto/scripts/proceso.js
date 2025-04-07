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

// Añadir texto a notas (ejemplo)
document.getElementById('notas-texto').textContent = "Detalles de tu creación. Estas notas se guardarán con tu pedido.";