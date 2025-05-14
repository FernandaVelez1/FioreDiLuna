<?php
session_start(); // ESTO DEBE IR EN LA PRIMERA LÍNEA DEL ARCHIVO
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fiore di Luna</title>
    <link rel="stylesheet" href="estilos/homeStyle.css">

    <link rel="stylesheet" href="estilos/navbar.css">
    <link rel="stylesheet" href="estilos/footer.css">
    <link rel="stylesheet" href="estilos/menu.css">

    <link rel="icon" type="image/png" href="imagenes/isotipo.png">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Ovo&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Barra de navegación -->
    <nav class="navbar">
         <!-- <div class="nav-left">
            <a href="#"><i class="bi bi-list"></i></a>
        </div> -->
        <div class="nav-left">
            <a href="#" id="menu-toggle"><i class="bi bi-list"></i></a>
        </div>
        <div class="nav-center">
            <img src="imagenes/isotipo.png" alt="Fiore di Luna Logo" class="logo">
            <h1>FIORE DI LUNA</h1>
        </div>
        <div class="nav-right">
            <div class="search-container">
                <input type="text" id="search-input" class="search-input" placeholder="Buscar...">
                <a href="#" id="search-icon"><i class="bi bi-search"></i></a>
            </div>
            <a href="#"><i class="bi bi-handbag"></i></a>
            <div class="nav-rights">
    <?php if (isset($_SESSION['user_name'])): ?>
        <div class="user-dropdown">
            <a href="#" class="user-name">
                <?= strtoupper(substr($_SESSION['user_name'], 0, 1)) ?>
            </a>
            <div class="dropdown-content">
                <a href="logout.php">Cerrar sesión</a>
            </div>
        </div>
    <?php else: ?>
        <a href="iniciarSesion.html"><i class="bi bi-person"></i></a>
    <?php endif; ?>
</div>
        </div> 
    </nav>
   <!-- Menú desplegable -->
   <div class="menu-overlay" id="menu-overlay">
    <div class="menu-container">
        <button class="close-menu" id="close-menu">
            <i class="bi bi-x"></i>
        </button>
        <div class="menu-header">
            <img src="imagenes/isotipo.png" alt="Fiore di Luna" class="menu-logo">
            <p class="menu-slogan">FIORE DI LUNA</p>
        </div>
        <ul class="menu-items">
            <li><a href="index.php">Inicio</a></li>
            <li><a href="sobreNosotros.php">Sobre nosotros</a></li>
            <li><a href="creacion.html">Crea tu perfume</a></li>
            <li><a href="fragancias.php">Escencias</a></li>
            <li><a href="frascos.php">Envases</a></li>
            <li><a href="nuestras-creaciones.html">Nuestras creaciones</a></li>
        </ul>
        <div class="menu-footer">
            <a href="#" class="accessibility-link">Donde la Luna y tu Esencia se Encuentran</a>
        </div>
    </div>
</div>

    <!-- Header -->
    <section class="header">
        <!-- <h2 class="titulo-lema">Donde la Luna y tu Escencia se Encuentran</h2> -->
        <div class="video-promocional">
            <video autoplay muted loop>
                <source src="imagenes/video1.mp4" type="video/mp4">
            </video>
        </div>
    </section>

    <!-- Crea tu Perfume -->
<section class="crea-tu-perfume">
    <div class="contenedor-titulo">
        <img src="imagenes/isotipo.png" alt="Isotipo" class="isotipo">
        <h1 class="titulo-seccion">Crea tu Perfume en 3 Simples Pasos</h1>
    </div>
    <div class="pasos-container">
        <a href="creacion.html" class="paso-link">
            <div class="paso">
                <img src="imagenes/WhatsApp Image 2025-02-16 at 7.55.30 PM.jpeg" alt="Paso 1">
                <p class="parrafo-section">Elige tus Aromas</p>
            </div>
        </a>
        <a href="creacion.html" class="paso-link">
            <div class="paso">
                <img src="imagenes/chica castaña esta de espaldas, esta viendo una pared con 10 diseños de perfumes, estos perfumes tienen el nombre de Fiore Di Luna, trata de decidir cual envase elegir.jpg" alt="Paso 2">
                <p class="parrafo-section">Personaliza tu Envase</p>
            </div>
        </a>
        <a href="creacion.html" class="paso-link">
            <div class="paso">
                <img src="imagenes/21.jpg" alt="Paso 3">
                <p class="parrafo-section">Recibe tu Obra Maestra</p>
            </div>
        </a>
    </div>
</section>

    <!-- Descubre Nuestras Escencias -->
<section class="descubre-escencias">
    <div class="contenedor-titulo">
        <h1 class="titulo-seccion">Descubre Nuestras Escencias</h1>
        <img src="imagenes/isotipo.png" alt="Isotipo" class="isotipo">
    </div>
    <div class="escencia-container">
        <a href="fragancias.html#cereza" class="escencia-link">
            <div class="escencia">
                <img src="imagenes/WhatsApp Image 2025-02-14 at 7.21.08 AM.jpeg" alt="Escencia 1">
                <p class="parrafo-section">Explora Más</p>
            </div>
        </a>
        <a href="fragancias.html#canela" class="escencia-link">
            <div class="escencia">
                <img src="imagenes/WhatsApp Image 2025-02-14 at 7.48.34 AM.jpeg" alt="Escencia 2">
                <p class="parrafo-section">Explora Más</p>
            </div>
        </a>
        <a href="fragancias.html#dulces" class="escencia-link">
            <div class="escencia">
                <img src="imagenes/descarga (2).jpg" alt="Escencia 3">
                <p class="parrafo-section">Explora Más</p>
            </div>
        </a>
        <a href="fragancias.html#amaderadas" class="escencia-link">
            <div class="escencia">
                <img src="imagenes/WhatsApp Image 2025-02-14 at 8.19.41 AM.jpeg" alt="Escencia 4">
                <p class="parrafo-section">Explora Más</p>
            </div>
        </a>
        <a href="fragancias.html#citricas" class="escencia-link">
            <div class="escencia">
                <img src="imagenes/WhatsApp Image 2025-02-14 at 7.39.15 AM.jpeg" alt="Escencia 5">
                <p class="parrafo-section">Explora Más</p>
            </div>
        </a>
        <a href="fragancias.html#florales" class="escencia-link">
            <div class="escencia">
                <img src="imagenes/WhatsApp Image 2025-02-14 at 8.51.35 AM.jpeg" alt="Escencia 6">
                <p class="parrafo-section">Explora Más</p>
            </div>
        </a>
    </div>
</section>

    <!-- Envases que Reflejan tu Estilo -->
<section class="descubre-envase">
    <div class="contenedor-titulo">
        <img src="imagenes/isotipo.png" alt="Isotipo" class="isotipo">
        <h1 class="titulo-seccion">Envases que Reflejan tu Estilo</h1>
    </div>
    <div class="envase-container">
        <a href="frascos.html" class="envase-link">
            <div class="envase">
                <img src="imagenes/p4.png" alt="Envase Clásico">
            </div>
        </a>
        <a href="frascos.html" class="envase-link">
            <div class="envase">
                <img src="imagenes/WhatsApp Image 2025-02-14 at 8.25.40 AM.jpeg" alt="Envase Moderno">
            </div>
        </a>
        <a href="frascos.html" class="envase-link">
            <div class="envase">
                <img src="imagenes/p1.png" alt="Envase Elegante">
            </div>
        </a>
        <a href="frascos.html" class="envase-link">
            <div class="envase">
                <img src="imagenes/perfumes-1024x640.jpg" alt="Colección de Envases">
            </div>
        </a>
    </div>
    <p class="parrafo-section">Personaliza tu envase con iniciales o colores exclusivos.</p>
</section>

    <!-- Vive la Experiencia -->
    <section class="descubre-vive">
        <div class="contenedor-titulo">
            <h1 class="titulo-seccion">Vive la Experiencia</h1>
            <img src="imagenes/isotipo.png" alt="Isotipo" class="isotipo">
        </div>
        <div class="vive-container">
            <div class="vive">
                <img src="imagenes/experiencia.jpg" alt="Paso 1">
            </div>
            <div class="vive">
                <img src="imagenes/una joven de 25 años abriendo un regalo, adentro del regalo esta un perfume Fiore Di Luna, la joven se ve emocionada.jpg" alt="Paso 2">
            </div>
        </div>
        <p class="parrafo-section">Cada fragancia cuenta una historia. ¿Cuál será la tuya?</p>
    </section>

    <footer>
        <div class="foot-titulo">
            <img src="imagenes/isotipo.png" alt="Isotipo" class="isotipo">
            <h1 class="titulo-foot">FIORE DI LUNA</h1>
        </div>
        <div class="footer-content">
            <div class="footer-section">
                <h3>¿Necesita ayuda?</h3>
                <ul>
                    <li>Comuníquese Con Nosotros</li>
                    <li>Preguntas Frecuentes</li>
                    <li>Mi Pedido</li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>La Empresa</h3>
                <ul>
                    <li>Acerca de Fiore Di Luna</li>
                    <li>Código De Ética</li>
                    <li>Información Corporativa</li>
                    <li>Privacidad Y Cookies</li>
                    <li>Avisos Legales</li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Servicio al Cliente</h3>
                <ul>
                    <li>Consejos y Servicios</li>
                    <li>Entregas y Devoluciones</li>
                    <li>FAQ</li>
                    <li>Facturación</li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>IDIOMA</h3>
                <ul>
                    <li>ESPAÑOL</li>
                </ul>
                <h3>PAÍS/REGIÓN</h3>
                <ul>
                    <li>MÉXICO</li>
                </ul>
            </div>
        </div>
        <div class="footer-line"></div>
        <div class="footer-icons">
            <a href="#"><i class="bi bi-instagram"></i></a>
            <a href="#"><i class="bi bi-facebook"></i></i></a>
            <a href="#"><i class="bi bi-tiktok"></i></i></a>
            <a href="#"><i class="bi bi-linkedin"></i></i></a>
        </div>
    </footer>

    <script src="scripts/menu.js"></script>
    <script src="scripts/search.js"></script>
</body>
</html>