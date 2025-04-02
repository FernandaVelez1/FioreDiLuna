document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuOverlay = document.getElementById('menu-overlay');
    const closeMenu = document.getElementById('close-menu');
    
    // Abrir menú con efecto
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        menuOverlay.style.display = 'flex';
        setTimeout(() => {
            menuOverlay.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden';
    });
    
    // Cerrar menú con efecto
    function closeMenuFunction() {
        menuOverlay.classList.remove('active');
        setTimeout(() => {
            menuOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }, 400); // Tiempo igual a la duración de la transición
    }
    
    closeMenu.addEventListener('click', closeMenuFunction);
    
    // Cerrar al hacer clic fuera del menú
    menuOverlay.addEventListener('click', function(e) {
        if (e.target === menuOverlay) {
            closeMenuFunction();
        }
    });
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
            closeMenuFunction();
        }
    });
});