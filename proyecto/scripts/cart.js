document.addEventListener('DOMContentLoaded', function() {
  const carritoIcon = document.getElementById('carrito-icon');
  const carritoContainer = document.getElementById('carrito-container');
  const cerrarCarrito = document.getElementById('cerrar-carrito');
  const carritoOverlay = document.getElementById('carrito-overlay');

  // Abrir carrito
  carritoIcon.addEventListener('click', function(e) {
    e.preventDefault();
    carritoContainer.classList.add('abierto');
    carritoOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden'; // Evita el scroll del body
  });

  // Cerrar carrito
  cerrarCarrito.addEventListener('click', function() {
    carritoContainer.classList.remove('abierto');
    carritoOverlay.classList.remove('visible');
    document.body.style.overflow = ''; // Restaura el scroll del body
  });

  // Cerrar al hacer clic en el overlay
  carritoOverlay.addEventListener('click', function() {
    carritoContainer.classList.remove('abierto');
    carritoOverlay.classList.remove('visible');
    document.body.style.overflow = '';
  });

  // Cerrar con la tecla ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && carritoContainer.classList.contains('abierto')) {
      carritoContainer.classList.remove('abierto');
      carritoOverlay.classList.remove('visible');
      document.body.style.overflow = '';
    }
  });
});