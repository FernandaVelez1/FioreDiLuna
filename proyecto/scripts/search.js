document.addEventListener('DOMContentLoaded', function() {
    const searchIcon = document.getElementById('search-icon');
    const searchInput = document.getElementById('search-input');
    
    // Mostrar/ocultar campo de búsqueda al hacer clic en la lupa
    searchIcon.addEventListener('click', function(e) {
        e.preventDefault();
        searchInput.classList.toggle('active');
        
        // Si el campo está visible, enfócalo
        if (searchInput.classList.contains('active')) {
            searchInput.focus();
        }
    });
    
    // Ocultar el campo de búsqueda cuando se hace clic fuera de él
    document.addEventListener('click', function(e) {
        if (!searchIcon.contains(e.target) && !searchInput.contains(e.target)) {
            searchInput.classList.remove('active');
        }
    });
    
    // Evitar que el clic en el campo de búsqueda lo oculte
    searchInput.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});