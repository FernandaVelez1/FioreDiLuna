document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const cartIcon = document.querySelector('.bi-handbag').parentElement;
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCart = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    // Carrito de compras (almacenado en localStorage)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Event listeners
    cartIcon.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartFunc);
    cartOverlay.addEventListener('click', function(e) {
        if (e.target === cartOverlay) {
            closeCartFunc();
        }
    });
    
    // Formatear precio con comas
    function formatPrice(price) {
        return '$' + price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    
    // Abrir carrito
    function openCart(e) {
        e.preventDefault();
        cartOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        renderCart();
    }
    
    // Cerrar carrito
    function closeCartFunc() {
        cartOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Renderizar carrito
    function renderCart() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <p>Tu bolsa de compras está vacía</p>
                    <a href="prueba.php" class="start-creating-btn">Comenzar a crear</a>
                </div>
            `;
            checkoutBtn.disabled = true;
            cartSummary.style.display = 'none'; // Ocultar resumen cuando el carrito está vacío
            return;
        }
        
        // Mostrar resumen si hay productos
        cartSummary.style.display = 'block';
        cartItemsContainer.innerHTML = '';
        
        cart.forEach((item, index) => {
            // Extraer el color del texto de descripción
            let colorSquare = '';
            console.log('Item:', item);
            const colorMatch = item.description?.match(/Color: (#[0-9A-Fa-f]{6})/);
            if (colorMatch && colorMatch[1]) {
                colorSquare = `<span class="color-square" style="background-color: ${colorMatch[1]};"></span>`;
            }
            
            // Reemplazar el código de color por el cuadrado de color
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
            btn.addEventListener('click', decreaseQuantity);
        });
        
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', increaseQuantity);
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', removeItem);
        });
        
        checkoutBtn.disabled = false;
        updateSummary(calculateTotal());
    }
    
    // Actualizar resumen con envío
    function updateSummary(subtotal) {
        const shippingCost = subtotal === 0 ? 0 : (subtotal < 3000 ? 500 : 0);
        const total = subtotal + shippingCost;
        
        document.querySelector('.subtotal').textContent = `${formatPrice(subtotal)} MXN`;
        document.querySelector('.shipping').textContent = shippingCost === 0 ? 
            (subtotal === 0 ? '$0.00 MXN' : 'Envío Gratis') : `${formatPrice(shippingCost)} MXN`;
        document.querySelector('.total-price').textContent = `${formatPrice(total)} MXN`;
    }
    
    // Calcular subtotal
    function calculateTotal() {
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
    
    // Disminuir cantidad (con mínimo de 1 sin mensaje)
    function decreaseQuantity(e) {
        const index = e.target.getAttribute('data-index');
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
            saveCart();
            renderCart();
        }
    }
    
    // Aumentar cantidad
    function increaseQuantity(e) {
        const index = e.target.getAttribute('data-index');
        cart[index].quantity++;
        saveCart();
        renderCart();
    }
    
    // Eliminar item
    function removeItem(e) {
        const index = e.target.getAttribute('data-index');
        cart.splice(index, 1);
        saveCart();
        renderCart(); // Esto automáticamente manejará la visibilidad del resumen
    }
    
    // Guardar carrito en localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Función para agregar un item al carrito
    window.addToCart = function(item) {
        // Mostrar diálogo de confirmación
        const confirmation = confirm(`¿Estás seguro de agregar este perfume a tu bolsa?\n\nUna vez agregado no podrás editarlo.`);
        
        if (!confirmation) {
            return; // El usuario canceló
        }
        
        if (!item.name || item.name.trim() === '') {
            item.name = 'Perfume Personalizado';
        }
        
        // Obtener imagen del envase seleccionado
        const envaseSelect = document.querySelector('.envase-select');
        if (envaseSelect) {
            const selectedOption = envaseSelect.options[envaseSelect.selectedIndex];
            const bottleImage = selectedOption.getAttribute('data-imagen');
            item.bottleImage = `frascos/${bottleImage}`;
        }
        
        // Obtener color seleccionado
        const colorSelected = document.querySelector('.color-circulo.selected');
        if (colorSelected) {
            const color = colorSelected.getAttribute('data-color');
            item.description = item.description.replace(/Color: [^|]*/, `Color: ${color}`);
        }
        
        const existingItemIndex = cart.findIndex(cartItem => 
            cartItem.name === item.name && 
            cartItem.description === item.description
        );
        
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += item.quantity;
        } else {
            cart.push(item);
        }
        
        saveCart();
        
        // Mostrar mensaje y luego redirigir
        showAddToCartConfirmation(() => {
            window.location.href = 'prueba.php';
        });
    };
    
    // Mostrar confirmación de producto añadido con callback para redirección
    function showAddToCartConfirmation(callback) {
        const confirmation = document.createElement('div');
        confirmation.className = 'add-to-cart-confirmation';
        confirmation.innerHTML = `
            <i class="bi bi-check-circle"></i>
            <span>Perfume agregado a tu bolsa</span>
        `;
        document.body.appendChild(confirmation);
        
        setTimeout(() => {
            confirmation.classList.add('show');
        }, 10);
        
        // Esperar 1.5 segundos antes de redirigir
        setTimeout(() => {
            confirmation.classList.remove('show');
            setTimeout(() => {
                confirmation.remove();
                if (callback) callback();
            }, 300);
        }, 1500);
    }
});