document.addEventListener('DOMContentLoaded', function() {
    // 1. Cargar el SDK de PayPal dinámicamente
    if (!document.querySelector('script[src*="paypal.com/sdk/js"]')) {
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=AXpnYQmWUFOCDEObNqNKMasC70TJjCIm5h2Pr-9UWicpg9fNpgzelQKHfl7n26yjFMF9EbIDCXj3n9jC&currency=MXN&intent=capture`;
        script.addEventListener('load', initPayPal);
        document.body.appendChild(script);
    } else {
        initPayPal();
    }

    function initPayPal() {
        // Elementos del DOM
        const cartIcon = document.querySelector('.bi-handbag').parentElement;
        const checkoutBtn = document.querySelector('.checkout-btn');
        const backToCartBtn = document.getElementById('back-to-cart');
        const cartOverlay = document.getElementById('cart-overlay');
        const paymentOverlay = document.getElementById('payment-overlay');
        const closeCart = document.getElementById('close-cart');
        const closePayment = document.getElementById('close-payment');
        const paypalButtonsContainer = document.getElementById('paypal-button-container');
        const cartItemsContainer = document.getElementById('cart-items');
        const cartSummary = document.getElementById('cart-summary');
        
        // Carrito de compras
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Función para formatear precio
        function formatPrice(price) {
            return '$' + price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }

        // Función para calcular el total
        function calculateTotal() {
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shipping = subtotal === 0 ? 0 : (subtotal < 3000 ? 500 : 0);
            return subtotal + shipping;
        }

        // Función para actualizar el contador del carrito
        function updateCartCounter() {
            const cartCounter = document.querySelector('.cart-counter');
            if (cartCounter) {
                const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
                cartCounter.textContent = totalItems;
                cartCounter.style.display = totalItems > 0 ? 'flex' : 'none';
            }
        }

        // Función para actualizar el resumen del carrito
        function updateCartSummary() {
            if (cart.length === 0) {
                cartSummary.style.display = 'none';
                return;
            }

            cartSummary.style.display = 'block';
            const total = calculateTotal();
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shipping = subtotal === 0 ? 0 : (subtotal < 3000 ? 500 : 0);

            document.querySelector('.subtotal').textContent = formatPrice(subtotal);
            document.querySelector('.shipping').textContent = shipping === 0 ? 
                (subtotal === 0 ? '$0.00 MXN' : 'Envío Gratis') : formatPrice(shipping);
            document.querySelector('.total-price').textContent = formatPrice(total);
            
            // Actualizar también el total en la sección de pago si está visible
            if (paymentOverlay.style.display === 'flex') {
                document.querySelector('#payment-summary .total-price').textContent = formatPrice(total);
            }
        }

        // ========== EVENT LISTENERS ========== //
        
        // Abrir carrito
        if (cartIcon) {
            cartIcon.addEventListener('click', function(e) {
                e.preventDefault();
                cartOverlay.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                renderCart();
                updateCartSummary();
            });
        }

        // Cerrar carrito
        if (closeCart) {
            closeCart.addEventListener('click', closeCartFunc);
        }

        // Cerrar al hacer clic fuera del carrito
        if (cartOverlay) {
            cartOverlay.addEventListener('click', function(e) {
                if (e.target === cartOverlay) {
                    closeCartFunc();
                }
            });
        }

        // Botón de checkout (ir a pago)
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (cart.length === 0) return;
                
                closeCartFunc();
                paymentOverlay.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                
                // Actualizar el total en la sección de pago
                updatePaymentTotal();
                
                // Inicializar botones de PayPal
                setTimeout(() => {
                    initPayPalButtons(calculateTotal());
                }, 300);
            });
        }

        // Botón para volver al carrito
        if (backToCartBtn) {
            backToCartBtn.addEventListener('click', function(e) {
                e.preventDefault();
                paymentOverlay.style.display = 'none';
                openCart(e);
                updateCartSummary();
            });
        }

        // Cerrar ventana de pago
        if (closePayment) {
            closePayment.addEventListener('click', closePaymentFunc);
        }

        // Cerrar al hacer clic fuera de pago
        if (paymentOverlay) {
            paymentOverlay.addEventListener('click', function(e) {
                if (e.target === paymentOverlay) {
                    closePaymentFunc();
                }
            });
        }

        // ========== FUNCIONES DE NAVEGACIÓN ========== //

        function openCart(e) {
            e.preventDefault();
            cartOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            renderCart();
            updateCartSummary();
        }

        function closeCartFunc() {
            cartOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        function closePaymentFunc() {
            paymentOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Actualizar total en sección de pago
        function updatePaymentTotal() {
            const total = calculateTotal();
            document.querySelector('#payment-summary .total-price').textContent = formatPrice(total);
        }

        // ========== FUNCIONALIDAD PAYPAL ========== //

        function initPayPalButtons(total) {
            paypalButtonsContainer.innerHTML = '<div class="paypal-loading">Cargando métodos de pago...</div>';

            try {
                if (typeof paypal === 'undefined') {
                    throw new Error('PayPal SDK no se cargó correctamente');
                }

                paypalButtonsContainer.innerHTML = '';

                paypal.Buttons({
                    style: {
                        color: 'silver',
                        shape: 'rect',
                        label: 'pay',
                        height: 48,
                        layout: 'vertical'
                    },
                    createOrder: function(data, actions) {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: (total / 100).toFixed(2),
                                    currency_code: 'MXN',
                                    breakdown: {
                                        item_total: {
                                            value: (total / 100).toFixed(2),
                                            currency_code: 'MXN'
                                        }
                                    }
                                },
                                items: cart.map(item => ({
                                    name: item.name.substring(0, 127),
                                    quantity: item.quantity.toString(),
                                    unit_amount: {
                                        value: (item.price / 100).toFixed(2),
                                        currency_code: 'MXN'
                                    }
                                }))
                            }],
                            application_context: {
                                shipping_preference: 'NO_SHIPPING'
                            }
                        });
                    },
                    onApprove: function(data, actions) {
                        return actions.order.capture().then(function(details) {
                            showPaymentSuccess(details.id);
                        }).catch(err => {
                            console.error('Capture error:', err);
                            alert('Error al confirmar el pago. Verifica con tu banco.');
                        });
                    },
                    onCancel: function(data) {
                        console.log('Pago cancelado:', data);
                    },
                    onError: function(err) {
                        console.error('PayPal error:', err);
                        paypalButtonsContainer.innerHTML = `
                            <div class="paypal-error">
                                <p>Error al cargar PayPal.</p>
                                <button id="retry-paypal" class="retry-btn">Reintentar</button>
                            </div>
                        `;
                        document.getElementById('retry-paypal').addEventListener('click', () => initPayPalButtons(calculateTotal()));
                    }
                }).render('#paypal-button-container');
            } catch (error) {
                console.error('PayPal init error:', error);
                paypalButtonsContainer.innerHTML = `
                    <div class="paypal-error">
                        <p>Error al inicializar PayPal.</p>
                        <button id="retry-paypal" class="retry-btn">Reintentar</button>
                    </div>
                `;
                document.getElementById('retry-paypal').addEventListener('click', () => initPayPalButtons(calculateTotal()));
            }
        }

        function showPaymentSuccess(transactionId) {
            // Vaciar el carrito
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCounter();

            // Mostrar mensaje de éxito
            paymentOverlay.innerHTML = `
                <div class="payment-success">
                    <i class="bi bi-check-circle"></i>
                    <h2>¡Pago completado!</h2>
                    <p>ID de transacción: ${transactionId}</p>
                    <button id="close-payment-success" class="close-success-btn">Cerrar</button>
                </div>
            `;

            document.getElementById('close-payment-success').addEventListener('click', function() {
                paymentOverlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }

        // ========== FUNCIONES DEL CARRITO ========== //

        function renderCart() {
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = `
                    <div class="empty-cart">
                        <p>Tu bolsa de compras está vacía</p>
                        <a href="prueba.php" class="start-creating-btn">Comenzar a crear</a>
                    </div>
                `;
                checkoutBtn.disabled = true;
                cartSummary.style.display = 'none';
                return;
            }

            // Mostrar resumen si hay productos
            cartSummary.style.display = 'block';
            cartItemsContainer.innerHTML = '';
            
            cart.forEach((item, index) => {
                let colorSquare = '';
                const colorMatch = item.description?.match(/Color: (#[0-9A-Fa-f]{6})/);
                if (colorMatch && colorMatch[1]) {
                    colorSquare = `<span class="color-square" style="background-color: ${colorMatch[1]};"></span>`;
                }
                
                const descriptionWithColor = item.description.replace(/(Color: )#[0-9A-Fa-f]{6}/, `$1${colorSquare}`);
                
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.setAttribute('data-index', index);
                cartItem.innerHTML = `
                    <img src="${item.bottleImage || item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3 class="cart-item-title">${item.name}</h3>
                        <p class="cart-item-description">${descriptionWithColor}</p>
                        <p class="cart-item-price">${formatPrice(item.price * item.quantity)} MXN</p>
                        <div class="cart-item-actions">
                            <div class="quantity-controls">
                                <div class="quantity-selector">
                                    <button class="quantity-btn minus" data-index="${index}">-</button>
                                    <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                                    <button class="quantity-btn plus" data-index="${index}">+</button>
                                </div>
                                <button class="remove-item" data-index="${index}">Eliminar</button>
                            </div>
                            <div class="quantity-message" ${item.quantity > 1 ? 'style="display:block;"' : ''}>
                                Cada número representa un perfume completo idéntico
                            </div>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
            
            // Event listeners para los botones de cantidad y eliminar
            document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    const index = e.target.getAttribute('data-index');
                    if (cart[index].quantity > 1) {
                        cart[index].quantity--;
                        saveCart();
                        renderCart();
                        updateCartSummary();
                    }
                });
            });
            
            document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    const index = e.target.getAttribute('data-index');
                    cart[index].quantity++;
                    saveCart();
                    renderCart();
                    updateCartSummary();
                });
            });
            
            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    const index = e.target.getAttribute('data-index');
                    cart.splice(index, 1);
                    saveCart();
                    renderCart();
                    updateCartSummary();
                });
            });
            
            checkoutBtn.disabled = false;
            updateCartSummary();
        }

        function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        // Inicializar
        updateCartCounter();
        renderCart();
    }
});