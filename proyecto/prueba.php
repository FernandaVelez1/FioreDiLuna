<?php
session_start(); // ESTO DEBE IR EN LA PRIMERA LÍNEA DEL ARCHIVO
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Creación - Fiore Di Luna</title>
    <link rel="stylesheet" href="estilos/prueba.css">

    <link rel="stylesheet" href="estilos/navbar.css">
    <link rel="stylesheet" href="estilos/footer.css">
    <link rel="stylesheet" href="estilos/menu.css">
    <link rel="stylesheet" href="estilos/cart.css">
    <link rel="stylesheet" href="estilos/paypal.css">

    <link rel="icon" type="image/png" href="imagenes/isotipo.png">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Ovo&display=swap" rel="stylesheet">
    <!-- PAYPAL -->
    
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

<!-- Header -->
<section class="header">
    <h2 class="titulo-lema">Crea tu Perfume en 3 Simples Pasos</h2>
    <div class="imagen-promocional">
        <img src="imagenes/WhatsApp Image 2025-04-06 at 8.38.44 PM.jpeg" alt="Paso 1">
    </div>
    <!--  -->
</section>

<!-- Elegir Aromas -->
<section class="elige-aromas">
    <div class="contenedor-titulo">
        <img src="imagenes/isotipo.png" alt="Isotipo" class="isotipo">
        <h1 class="titulo-seccion">Elige tus Aromas</h1>
    </div>  
    <div class="aromas-container">
        <div class="aromas-form">
            <div class="esencia-container">
                <label class="esencia-label">Esencia:</label>
                <select class="esencia-select">
                    <option data-precio-base="1200" data-imagen="imagen1.png">CEREZA NEGRA</option>
                    <option data-precio-base="1000" data-imagen="imagen2.png">CEREZA DULCE</option>
                    <option data-precio-base="1500" data-imagen="imagen3.png">CEREZA AMBARINA</option>
                    <option data-precio-base="1200" data-imagen="imagen4.png">OUD</option>
                    <option data-precio-base="1000" data-imagen="imagen5.png">CEDRO</option>
                    <option data-precio-base="1500" data-imagen="imagen6.png">SANDALO</option>
                    <option data-precio-base="1500" data-imagen="imagen7.png">CANELA DULCE</option>
                    <option data-precio-base="1300" data-imagen="imagen8.png">CANELA AMADERADA</option>
                    <option data-precio-base="1200" data-imagen="imagen9.png">CANELA FLORAL</option>
                    <option data-precio-base="1000" data-imagen="imagen11.png">LIMA</option>
                    <option data-precio-base="1500" data-imagen="imagen12.png">NARANJA</option>
                    <option data-precio-base="1300" data-imagen="imagen13.png">BERGAMOTA</option>
                    <option data-precio-base="1200" data-imagen="imagen14.png">VAINILLA</option>
                    <option data-precio-base="1000" data-imagen="imagen15.png">MIEL</option>
                    <option data-precio-base="1500" data-imagen="imagen16.png">COCO</option>
                    <option data-precio-base="1300" data-imagen="imagen17.png">ROSA</option> 
                    <option data-precio-base="1500" data-imagen="imagen18.png">PEONÍA</option>
                    <option data-precio-base="1300" data-imagen="imagen19.png">JAZMÍN</option>  
                </select>
            </div>
            <div class="contenido-container">
                <label class="contenido-label">Contenido:</label>
                <div class="contenido-opciones">
                    <button class="contenido-btn active" data-ml="50">50 mL</button>
                    <button class="contenido-btn" data-ml="100">100 mL</button>
                    <button class="contenido-btn" data-ml="150">150 mL</button>
                    <button class="contenido-btn" data-ml="200">200 mL</button>
                </div>
            </div>
            <div class="intensidad-container">
                <label class="intensidad-label">Intensidad:</label>
                <div class="intensidad-selector">
                    <div class="intensidad-cuadro"></div>
                    <div class="intensidad-cuadro"></div>
                    <div class="intensidad-cuadro"></div>
                    <div class="intensidad-cuadro"></div>
                    <div class="intensidad-cuadro"></div>
                </div>
            </div>
            <div class="precio-agregar-container">
                <div class="precio-container">
                    <label class="precio-label">Precio:</label>
                    <span class="precio-valor">$ 1,200.00 MXN</span>
                </div>
                <button class="agregar-btn">+ Añadir otro aroma</button>
            </div>
        </div>
        
        <div class="aromas-imagen">
            <img src="esencias/imagen1.png" alt="Elixir de Rosas">
        </div>
    </div>
    
    <div class="boton-siguiente-container">
        <button class="siguiente-btn">Siguiente paso <i class="bi bi-arrow-right"></i></button>
    </div>
</section>

<!-- PERSONALIZA ENVASE -->
<section class="personaliza-envase">
    <div class="contenedor-titulo">
        <h1 class="titulo-seccion">Personaliza tu Envase</h1>
        <img src="imagenes/isotipo.png" alt="Isotipo" class="isotipo">
    </div>
    
    <div class="envase-container">
        <div class="envase-imagen">
            <img src="frascos/1.png" alt="Frasco Incanto di Rosa" id="envase-imagen">
        </div>
        
        <div class="envase-form">
            <div class="envase-seleccion">
                <label class="envase-label">Envase:</label>
                <select class="envase-select" id="envase-select">
    <option data-imagen="1.png" data-precio="2100" data-colores="#FFD1DC,#F8C8DC,#FFECF5" data-ml="50">FRASCO ESENCIA PURA</option>
    <option data-imagen="2.png" data-precio="1800" data-colores="#D1C68E,#E2BFE8,#F8CCD4" data-ml="50">FRASCO AURORA BOREAL</option>
    <option data-imagen="11.png" data-precio="1900" data-colores="#F79DAB,#F1C2B1,#F1BBE3" data-ml="50">FRASCO MINIMALISTA ELEGANTE</option>
    <option data-imagen="4.png" data-precio="2670" data-colores="#FFB6C1,#F1DCFF,#E5BA93" data-ml="100">FRASCO SERENIDAD CLÁSICA</option>
    <option data-imagen="5.png" data-precio="2670" data-colores="#412610,#FAC25B,#FF9BB3" data-ml="100">FRASCO HARMONÍA LÍQUIDA</option>
    <option data-imagen="6.png" data-precio="3210" data-colores="#FEAF85,#FAEBC4,#F8CCD4" data-ml="150">FRASCO VARIOUM ELEGANTE</option>
    <option data-imagen="13.png" data-precio="3200" data-colores="#D5A077,#FFD9DA,#F3E1DD" data-ml="150">FRASCO DUALIDAD BRILLANTE</option>
    <option data-imagen="8.png" data-precio="3450" data-colores="#FFECED,#F8C8DC,#F8CCD4" data-ml="200">FRASCO LUJO ATEMPORAL</option>
    <option data-imagen="9.png" data-precio="3600" data-colores="#D0B76A,#E2BFE8,#FFB6C1" data-ml="200">FRASCO REFLEJO DE ÓPALO</option>
</select>
            </div>
            
            <div class="color-container">
                <label class="color-label">Color:</label>
                <div class="colores-opciones" id="colores-opciones">
                    <!-- Los colores se generarán dinámicamente con JS -->
                </div>
            </div>
            
            <div class="frase-container">
                <label class="frase-label">Frase Personalizada:</label>
                <p class="frase-nota">Escribe una frase especial que aparecerá grabada en tu envase. Por ejemplo: "Tu esencia, tu historia".</p>
                <input type="text" class="frase-input" placeholder="Escribe tu frase aquí" maxlength="20">
                <p class="frase-limite">Máximo 20 caracteres</p>
            </div>
            
            <div class="precio-listo-container">
                <div class="precio-container">
                    <label class="precio-label">Precio:</label>
                    <span class="precio-valor" id="precio-envase">$500.00 MXN</span>
                </div>
            </div>
        </div>
    </div>
    
    <div class="botones-navegacion">
        <button class="regresar-btn"><i class="bi bi-arrow-left"></i> Regresar</button>
        <button class="finalizar-btn">Tu Obra Maestra <i class="bi bi-arrow-right"></i></button>
    </div>
</section>

<!-- Sección de Resumen del Perfume -->
<section class="resumen-perfume">
    <div class="contenedor-titulo">
        <img src="imagenes/isotipo.png" alt="Isotipo" class="isotipo">
        <h1 class="titulo-seccion">Recibe tu Obra Maestra</h1>
    </div>
    
    <div class="resumen-container">
        <div class="resumen-content">
            <div class="resumen-mensaje">
                <h2>¡Felicidades! Has creado un perfume único!</h2>
                
                <!-- Agregar esta nueva sección -->
                <div class="nombre-perfume-container">
                    <p class="instruccion-nombre">Ahora, dale un nombre único como tú:</p>
                    <input type="text" class="nombre-perfume-input" placeholder="Escribe el nombre de tu perfume" maxlength="10">
                    <p class="limite-caracteres">Máximo 10 caracteres</p>
                </div>
                <div class="resumen-details">
    <!-- El contenido se actualizará dinámicamente -->
</div>
                <!--
                <div class="resumen-details">
                    <p><strong>Aromas seleccionadas:</strong> Cítricas, florales y amaderadas.</p>
                    <p><strong>Envase:</strong> Rosa con tapón dorado</p>
                    <p><strong>Frase:</strong> 'Tu esencia, tu historia'.</p>
                </div>

            -->
                
                <div class="resumen-divider"></div>
                
                <div class="resumen-total">
                    <p class="total-label"><strong>Total:</strong></p>
                    <p class="total-price1">$ 1,620.00 Mex</p>
                </div>
                
                <div class="resumen-buttons">
                    <button class="editar-btn">Volver a Editar</button>
                    <button class="bolsa-btn">Guardar en la Bolsa</button>
                </div>
            </div>
            
            <div class="resumen-imagen">
                <img src="imagenes/regalo1.jpg" alt="Perfume personalizado">
            </div>
        </div>
    </div>
    <p class="resumen-footer">Tu perfume personalizado está listo para ser tuyo</p>
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
    <script src="scripts/prueba.js"></script>
    <script src="scripts/cart.js"></script>
    <script src="scripts/paypal.js"></script>

</body>
</html>