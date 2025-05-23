<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Envases - Fiore Di Luna</title>
    <link rel="stylesheet" href="estilos/navbar.css">
    <link rel="stylesheet" href="estilos/footer.css">
    <link rel="stylesheet" href="estilos/menu.css">
    <link rel="stylesheet" href="envasesStyle.css">
    <link rel="stylesheet" href="estilos/cart.css">
    <link rel="icon" type="image/png" href="imagenes/isotipo.png">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Ovo&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="estilos/cart.css">
     <link rel="stylesheet" href="estilos/paypal.css">
    <script src="https://www.paypal.com/sdk/js?client-id=AXpnYQmWUFOCDEObNqNKMasC70TJjCIm5h2Pr-9UWicpg9fNpgzelQKHfl7n26yjFMF9EbIDCXj3n9jC&currency=MXN"></script>
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
                <li><a href="fragancias.php">Escencias</a></li>
                <li><a href="frascos.php">Envases</a></li>
                <li><a href="prueba.php">Nuestras creaciones</a></li>
            </ul>
            <div class="menu-footer">
                <a href="#" class="accessibility-link">Donde la Luna y tu Esencia se Encuentran</a>
            </div>
        </div>
    </div>

   <!-- Carrito de compras -->
<div class="cart-overlay" id="cart-overlay">
    <div class="cart-container">
        <button class="close-cart" id="close-cart">
            <i class="bi bi-x"></i>
        </button>
        <div class="cart-header">
            <img src="imagenes/isotipo.png" alt="Fiore di Luna Logo" class="logo2">
            <h2>TU BOLSA DE COMPRAS</h2>
        </div>
        <div class="cart-items" id="cart-items">
            <!-- Los items del carrito se agregarán dinámicamente aquí -->
            <div class="empty-cart">
                <p>Tu bolsa de compras está vacía</p>
                <a href="prueba.php" class="start-creating-btn" id="start-creating-btn">Comenzar a crear</a>
            </div>
        </div>
        <div class="cart-summary" id="cart-summary">
            <div class="summary-row">
                <span>Subtotal</span>
                <span class="subtotal">$0.00 MXN</span>
            </div>
            <div class="summary-row">
                <span>Envío</span>
                <span class="shipping">Calculado al finalizar</span>
            </div>
            <div class="summary-row total">
                <span>Total</span>
                <span class="total-price">$0.00 MXN</span>
            </div>
            <button class="checkout-btn" disabled>PROCEDER AL PAGO</button>
        </div>
    </div>
</div>

<!-- Sección de Pago -->
<div class="cart-overlay" id="payment-overlay">
    <div class="cart-container">
        <button class="close-cart" id="close-payment">
            <i class="bi bi-x"></i>
        </button>
        <div class="cart-header">
            <img src="imagenes/isotipo.png" alt="Fiore di Luna Logo" class="logo2">
            <h2>MÉTODOS DE PAGO</h2>
        </div>
        <div class="cart-items" id="payment-items">
            <!-- Contenido de información de pago -->
            <div class="payment-info">
                <img src="imagenes/una joven de 25 años abriendo un regalo, adentro del regalo esta un perfume Fiore Di Luna, la joven se ve emocionada.jpg" alt="Pago seguro" class="payment-image">
                <p class="payment-text">MÁS CERCA DE TU CREACIÓN</p>
            </div>
        </div>
        <div class="cart-summary" id="payment-summary">
            <div class="summary-row total">
                <span>Total a pagar</span>
                <span class="total-price">$0.00 MXN</span>
            </div>
            <!-- Botones de PayPal -->
            <div id="paypal-button-container"></div>
            <!-- Botón para regresar al carrito -->
            <button class="back-to-cart-btn" id="back-to-cart">
                <i class="bi bi-arrow-left"></i> REGRESAR A TU BOLSA DE COMPRAS
            </button>
        </div>
    </div>
</div>

    <!-- Envases de 50mL -->
    <section class="envase1">
        <div class="contenedor-titulo">
            <h1 class="titulo-seccion">Envases de 50mL</h1>
            <img src="isotipo.png" alt="Isotipo" class="isotipo">
        </div>
        <div class="envases1">
            <div class="env1">
                <img src="WhatsApp Image 2025-02-16 at 7.55.30 PM.jpeg" alt="Paso 1">
                <button class="btn-elegir">Elegir</button>
            </div>
            <div class="env1">
                <img src="chica castaña esta de espaldas, esta viendo una pared con 10 diseños de perfumes, estos perfumes tienen el nombre de Fiore Di Luna, trata de decidir cual envase elegir.jpg" alt="Paso 2">
                <button class="btn-elegir">Elegir</button>
            </div>
            <div class="env1">
                <img src="21.jpg" alt="Paso 3">
                <button class="btn-elegir">Elegir</button>
            </div>
        </div>
    </section>

    <!-- Envases de 100mL -->
    <section class="envase2">
        <div class="contenedor-titulo">
            <img src="isotipo.png" alt="Isotipo" class="isotipo">
            <h1 class="titulo-seccion">Envases de 100mL</h1>
        </div>
        <div class="envases2">
            <div class="env2">
                <img src="WhatsApp Image 2025-03-18 at 9.31.05 PM.jpeg" alt="Paso 1">
                <button class="btn-elegir">Elegir</button>
            </div>
            <div class="env2">
                <img src="WhatsApp Image 2025-03-18 at 9.31.05 PM (1).jpeg" alt="Paso 2">
                <button class="btn-elegir">Elegir</button>
            </div>
        </div>
    </section>

    <!-- Envases de 150mL -->
    <section class="envase3">
        <div class="contenedor-titulo">
            <img src="isotipo.png" alt="Isotipo" class="isotipo">
            <h1 class="titulo-seccion">Envases de 150mL</h1>
        </div>
        <div class="envases3">
            <div class="env3">
                <img src="WhatsApp Image 2025-03-18 at 9.31.07 PM.jpeg" alt="Paso 1">
                <button class="btn-elegir">Elegir</button>
            </div>
            <div class="env3">
                <img src="chica castaña esta de espaldas, esta viendo una pared con 10 diseños de perfumes, estos perfumes tienen el nombre de Fiore Di Luna, trata de decidir cual envase elegir.jpg" alt="Paso 2">
                <button class="btn-elegir">Elegir</button>
            </div>
        </div>
    </section>

    <!-- Envases de 200mL -->
    <section class="envase2">
        <div class="contenedor-titulo">
            <img src="isotipo.png" alt="Isotipo" class="isotipo">
            <h1 class="titulo-seccion">Envases de 200mL</h1>
        </div>
        <div class="envases2">
            <div class="env2">
                <img src="WhatsApp Image 2025-02-16 at 7.55.30 PM.jpeg" alt="Paso 1">
                <button class="btn-elegir">Elegir</button>
            </div>
            <div class="env2">
                <img src="chica castaña esta de espaldas, esta viendo una pared con 10 diseños de perfumes, estos perfumes tienen el nombre de Fiore Di Luna, trata de decidir cual envase elegir.jpg" alt="Paso 2">
                <button class="btn-elegir">Elegir</button>
            </div>
        </div>
    </section>

    <footer>
        <div class="foot-titulo">
            <img src="isotipo.png" alt="Isotipo" class="isotipo">
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
    <script src="scripts/cart.js"></script>
    <script src="scripts/paypal.js"></script>
</body>
</html>