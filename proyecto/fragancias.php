<?php
session_start(); // ESTO DEBE IR EN LA PRIMERA LÍNEA DEL ARCHIVO
?>


<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fiore di Luna</title>
    <link rel="stylesheet" href="estilos/fragancias.css">
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
            <li><a href="proceso.html">Crea tu perfume</a></li>
            <li><a href="fragancias.php">Escencias</a></li>
            <li><a href="frascos.php">Envases</a></li>
            <li><a href="nuestras-creaciones.html">Nuestras creaciones</a></li>
        </ul>
        <div class="menu-footer">
            <a href="#" class="accessibility-link">Donde la Luna y tu Esencia se Encuentran</a>
        </div>
    </div>
</div>

    <!-- Sección de Esencias de Cereza -->
    <section id="cereza" class="descubre-escencias">
        <h2 class="titulo-seccion">
            <img src="imagenes/isotipo.png" alt="Isotipo" class="isotipo-titulo"> Esencias de Cereza
        </h2>
        <div class="escencia">
            <p>Descubre la dulzura vibrante de la cereza más exquisita. En Fiore di Luna, cada fragancia afrutada envuelve los sentidos con delicadeza y encanto, dejando una estela sofisticada e inolvidable.</p>
        </div>
        <div class="escencia-container">
            <div class="escencia">
                <img src="esencias/imagen1.png" alt="Cereza Negra">
                <p>CEREZA NEGRA<br>Un aroma intenso y seductor, donde la dulzura oscura de la cereza negra se funde con matices profundos y envolventes.</p>
            </div>
            <div class="escencia">
                <img src="esencias/imagen2.png" alt="Cereza Dulce">
                <p>CEREZA DULCE<br>Una esencia vibrante y femenina, donde la jugosidad de la cereza madura se combina con sutiles notas avainilladas.</p>
            </div>
            <div class="escencia">
                <img src="esencias/imagen3.png" alt="Cereza Ambarina">
                <p>CEREZA AMBARINA<br>Una fragancia cálida y sensual, donde la dulzura afrutada de la cereza se encuentra con la profundidad del ámbar y la vainilla.</p>
            </div>
        </div>
    </section>

    <!-- Sección de Esencias Amaderadas -->
    <section id="amaderadas" class="descubre-escencias" style="background-color: #FFEBEC;">
        <h2 class="titulo-seccion">
            <img src="imagenes/isotipo.png" alt="Isotipo" class="isotipo-titulo"> Esencias Amaderadas
        </h2>
        <div class="escencia">
            <p>Descubre la calidez de las maderas más exquisitas. En Fiore di Luna, cada fragancia amaderada envuelve los sentidos con elegancia y misterio, dejando una estela sofisticada e inolvidable.</p>
        </div>
        <div class="escencia-container">
            <div class="escencia">
                <img src="esencias/imagen4.png" alt="OUD">
                <p>OUD<br>Una esencia profunda y sofisticada, donde el oud y las maderas nobles envuelven los sentidos con su magnetismo atemporal.</p>
            </div>
            <div class="escencia">
                <img src="esencias/imagen5.png" alt="CEDRO">
                <p>CEDRO<br>Elegancia y calidez atemporal. Su aroma amaderado y seco envuelve los sentidos con notas profundas y sofisticadas.</p>
            </div>
            <div class="escencia">
                <img src="esencias/imagen6.png" alt="SANDALO">
                <p>SANDALO<br>Cremoso y envolvente, con un toque cálido y ligeramente dulce que aporta sofisticación y sensualidad.</p>
            </div>
        </div>
    </section>

    <!-- Sección de Esencias de Canela -->
    <section id="canela" class="descubre-escencias">
        <h2 class="titulo-seccion">
            <img src="imagenes/isotipo.png" alt="Isotipo" class="isotipo-titulo"> Esencias de Canela
        </h2>
        <div class="escencia">
            <p>Descubre la calidez envolvente de la canela más sublime. En Fiore di Luna, cada fragancia especiada de canela envuelve los sentidos con su intensidad y elegancia, dejando una estela rica y cautivadora.</p>
        </div>
        <div class="escencia-container">
            <div class="escencia">
                <img src="esencias/imagen7.png" alt="Canela Dulce">
                <p>CANELA DULCE<br>Un aroma suave y acogedor, donde la canela se combina con notas de azúcar y miel, creando una fragancia reconfortante y ligeramente dulce.</p>
            </div>
            <div class="escencia">
                <img src="esencias/imagen8.png" alt="Canela Amaderada">
                <p>CANELA AMADERADA<br>Una esencia vibrante y femenina, donde la jugosidad de la cereza madura se combina con sutiles notas avainilladas.</p>
            </div>
            <div class="escencia">
                <img src="esencias/imagen9.png" alt="Canela Floral">
                <p>CANELA FLORAL<br>Una fragancia delicada y femenina, donde la canela se fusiona con suaves notas florales, creando una mezcla aromática encantadora que evoca calidez y frescura al mismo tiempo.</p>
            </div>
        </div>
    </section>

    <!-- Sección de Esencias Cítricas -->
    <section id="citricas" class="descubre-escencias" style="background-color: #FFEBEC;">
        <h2 class="titulo-seccion">
            <img src="imagenes/isotipo.png" alt="Isotipo" class="isotipo-titulo"> Esencias Cítricas
        </h2>
        <div class="escencia">
            <p>Fiore di Luna ofrece una colección de fragancias cítricas que combinan la frescura y la alegría de los cítricos con una sofisticación sutil.</p>
        </div>
        <div class="escencia-container">
            <div class="escencia">
                <img src="esencias/imagen11.png" alt="Lima">
                <p>LIMA<br>Una fragancia fresca, ligera y muy energizante, con un toque de dulzura que se mezcla perfectamente con su acidez, proporcionando una sensación de frescura.</p>
            </div>
            <div class="escencia">
                <img src="esencias/imagen12.png" alt="Naranja">
                <p>NARANJA<br>Tiene una dulzura cítrica y jugosa que aporta una sensación de frescura instantánea.</p>
            </div>
            <div class="escencia">
                <img src="esencias/imagen13.png" alt="Bergamota">
                <p>BERGAMOTA<br>Su aroma es fresco, pero también ligeramente floral y especiado, lo que lo hace menos ácido que otros cítricos.</p>
            </div>
        </div>
    </section>

    <!-- Sección de Esencias Dulces -->
    <section id="dulces" class="descubre-escencias">
        <h2 class="titulo-seccion">
            <img src="imagenes/isotipo.png" alt="Isotipo" class="isotipo-titulo"> Esencias Dulces
        </h2>
        <div class="escencia">
            <p>Descubre en Fiore di Luna sus fragancias dulces que envuelven tus sentidos en una experiencia única. Un toque de elegancia y suavidad que te acompaña todo el día. ¡Haz que tu presencia deje huella!</p>
        </div>
        <div class="escencia-container">
            <div class="escencia">
                <img src="esencias/imagen14.png" alt="Vainilla">
                <p>VAINILLA<br>Cremosa, cálida y envolvente, con un dulzor suave y adictivo que aporta calidez y confort.</p>
            </div>
            <div class="escencia">
                <img src="esencias/imagen15.png" alt="Miel">
                <p>MIEL<br>Dulce y dorada, con un toque floral y aterciopelado que añade una sensación de lujo natural.</p>
            </div>
            <div class="escencia">
                <img src="esencias/imagen16.png" alt="Coco">
                <p>COCO<br>Cremoso, exótico y aterciopelado, con un dulzor tropical refinado que evoca la calidez del sol sobre la piel.</p>
            </div>
        </div>
    </section>

    <section id="florales" class="descubre-escencias" style="background-color: #FFEBEC;">
        <h2 class="titulo-seccion">
            <img src="imagenes/isotipo.png" alt="Isotipo" class="isotipo-titulo"> Esencias Florales
        </h2>
        <div class="escencia">
            <p>Las esencias florales son una celebración de la delicadeza y la feminidad, capturando la pureza, la frescura y la elegancia de la naturaleza. Cada flor, desde la rosa hasta el jazmín, ofrece una experiencia sensorial única</p>
        </div>
        <div class="escencia-container">
            <div class="escencia">
                <img src="esencias/imagen17.png" alt="Lima">
                <p>ROSA<br>Es una fragancia clásica, suave y romántica. Su aroma dulce y ligeramente empolvado evoca sentimientos de elegancia atemporal</p>
            </div>
            <div class="escencia">
                <img src="esencias/imagen18.png" alt="Naranja">
                <p>PEONÍA<br>Su fragancia es ligera y floral, con un toque de frescura que recuerda a la primavera. Es una mezcla entre la rosa y el jazmín, pero con una suavidad que transmite calma y delicadeza.</p>
            </div>
            <div class="escencia">
                <img src="esencias/imagen19.png" alt="Bergamota">
                <p>JAZMÍN<br>Un aroma intenso y seductor, suave pero con una profundidad sensual. Es cálido, dulce y ligeramente afrutado, lo que le da una cualidad exótica.</p>
            </div>
        </div>
    </section>

    <!-- Footer -->
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
            <a href="#"><i class="bi bi-facebook"></i></a>
            <a href="#"><i class="bi bi-tiktok"></i></a>
            <a href="#"><i class="bi bi-linkedin"></i></a>
        </div>
    </footer>
    
    <script src="scripts/menu.js"></script>
    <script src="scripts/search.js"></script>
</body>
</html>