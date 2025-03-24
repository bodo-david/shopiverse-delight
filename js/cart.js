
// Cart operations
let cart = [];

// Load cart from localStorage
function loadCart() {
    try {
        const savedCart = localStorage.getItem('shopverse-cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
    } catch (error) {
        console.error('Error loading cart:', error);
        cart = [];
    }
    
    // Update cart count
    updateCartCount();
    
    return cart;
}

// Save cart to localStorage
function saveCart() {
    try {
        localStorage.setItem('shopverse-cart', JSON.stringify(cart));
        
        // Update cart count
        updateCartCount();
        
        // Dispatch event for cart changes
        window.dispatchEvent(new CustomEvent('cart-updated', { detail: { cart } }));
    } catch (error) {
        console.error('Error saving cart:', error);
    }
}

// Add product to cart
function addToCart(productId, quantity = 1) {
    // Load latest cart
    loadCart();
    
    // Find product in cart
    const existingProduct = cart.find(item => item.productId === productId);
    
    if (existingProduct) {
        // Update quantity
        existingProduct.quantity += quantity;
    } else {
        // Add new product
        cart.push({
            productId,
            quantity
        });
    }
    
    // Save updated cart
    saveCart();
}

// Update product quantity in cart
function updateCartItemQuantity(productId, quantity) {
    // Load latest cart
    loadCart();
    
    // Find product in cart
    const index = cart.findIndex(item => item.productId === productId);
    
    if (index !== -1) {
        if (quantity > 0) {
            // Update quantity
            cart[index].quantity = quantity;
        } else {
            // Remove product if quantity is 0 or negative
            cart.splice(index, 1);
        }
        
        // Save updated cart
        saveCart();
    }
}

// Remove product from cart
function removeCartItem(productId) {
    // Load latest cart
    loadCart();
    
    // Filter out the product
    cart = cart.filter(item => item.productId !== productId);
    
    // Save updated cart
    saveCart();
}

// Clear cart
function clearCart() {
    cart = [];
    saveCart();
}

// Calculate cart totals
function calculateCartTotals(currency = 'RON') {
    // Load latest cart
    loadCart();
    
    // Calculate totals
    let subtotal = 0;
    
    for (const item of cart) {
        const product = getProductById(item.productId);
        if (product) {
            const itemPrice = convertPrice(product.price, product.currency, currency);
            subtotal += itemPrice * item.quantity;
        }
    }
    
    const vat = subtotal * 0.19; // 19% VAT
    const total = subtotal + vat;
    
    return {
        subtotal,
        vat,
        total
    };
}

// Initialize the cart page
function initCartPage() {
    // Load cart
    const cartItems = loadCart();
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartEmptyEl = document.getElementById('cart-empty');
    const cartContentEl = document.getElementById('cart-content');
    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const cartVatEl = document.getElementById('cart-vat');
    const cartTotalEl = document.getElementById('cart-total');
    const clearCartBtn = document.getElementById('clear-cart');
    const recommendedProductsEl = document.getElementById('recommended-products');
    
    // Get current currency
    const currency = localStorage.getItem('shopverse-currency') || 'RON';
    
    if (cartItems.length === 0) {
        // Show empty cart
        if (cartEmptyEl) cartEmptyEl.classList.remove('hidden');
        if (cartContentEl) cartContentEl.classList.add('hidden');
    } else {
        // Show cart content
        if (cartEmptyEl) cartEmptyEl.classList.add('hidden');
        if (cartContentEl) cartContentEl.classList.remove('hidden');
        
        // Render cart items
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
            
            cartItems.forEach(item => {
                const product = getProductById(item.productId);
                if (product) {
                    const itemPrice = convertPrice(product.price, product.currency, currency);
                    const itemTotal = itemPrice * item.quantity;
                    
                    const cartItemHTML = `
                        <tr data-product-id="${product.id}">
                            <td>
                                <div class="cart-product">
                                    <div class="cart-product-image">
                                        <img src="${product.thumbnail || product.images[0]}" alt="${product.name}">
                                    </div>
                                    <div class="cart-product-info">
                                        <h3><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
                                        <p>${product.brand}</p>
                                    </div>
                                </div>
                            </td>
                            <td>${formatPrice(itemPrice, currency)}</td>
                            <td>
                                <div class="cart-quantity">
                                    <button class="cart-quantity-btn decrease-btn" data-product-id="${product.id}">-</button>
                                    <input type="number" value="${item.quantity}" min="1" max="99" class="cart-quantity-input" data-product-id="${product.id}">
                                    <button class="cart-quantity-btn increase-btn" data-product-id="${product.id}">+</button>
                                </div>
                            </td>
                            <td>${formatPrice(itemTotal, currency)}</td>
                            <td>
                                <button class="cart-remove-btn" data-product-id="${product.id}">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                    
                    cartItemsContainer.innerHTML += cartItemHTML;
                }
            });
            
            // Add event listeners to cart buttons
            setupCartButtons();
        }
        
        // Update totals
        const { subtotal, vat, total } = calculateCartTotals(currency);
        
        if (cartSubtotalEl) cartSubtotalEl.textContent = formatPrice(subtotal, currency);
        if (cartVatEl) cartVatEl.textContent = formatPrice(vat, currency);
        if (cartTotalEl) cartTotalEl.textContent = formatPrice(total, currency);
        
        // Setup clear cart button
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to clear your cart?')) {
                    clearCart();
                    window.location.reload();
                }
            });
        }
    }
    
    // Load recommended products
    if (recommendedProductsEl) {
        const recommendedProducts = getRandomProducts(3);
        
        recommendedProductsEl.innerHTML = '';
        
        recommendedProducts.forEach(product => {
            recommendedProductsEl.innerHTML += createProductCard(product);
        });
        
        // Setup add to cart buttons
        setupAddToCartButtons();
    }
    
    // Listen for currency changes
    window.addEventListener('currency-changed', (e) => {
        const { currency } = e.detail;
        
        // Recalculate and update totals
        const { subtotal, vat, total } = calculateCartTotals(currency);
        
        if (cartSubtotalEl) cartSubtotalEl.textContent = formatPrice(subtotal, currency);
        if (cartVatEl) cartVatEl.textContent = formatPrice(vat, currency);
        if (cartTotalEl) cartTotalEl.textContent = formatPrice(total, currency);
        
        // Update product prices
        if (cartItemsContainer) {
            cartItems.forEach(item => {
                const product = getProductById(item.productId);
                if (product) {
                    const itemPrice = convertPrice(product.price, product.currency, currency);
                    const itemTotal = itemPrice * item.quantity;
                    
                    const priceEl = cartItemsContainer.querySelector(`tr[data-product-id="${product.id}"] td:nth-child(2)`);
                    const totalEl = cartItemsContainer.querySelector(`tr[data-product-id="${product.id}"] td:nth-child(4)`);
                    
                    if (priceEl) priceEl.textContent = formatPrice(itemPrice, currency);
                    if (totalEl) totalEl.textContent = formatPrice(itemTotal, currency);
                }
            });
        }
    });
}

// Setup cart buttons
function setupCartButtons() {
    // Quantity decrease buttons
    const decreaseButtons = document.querySelectorAll('.decrease-btn');
    decreaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            const inputEl = document.querySelector(`.cart-quantity-input[data-product-id="${productId}"]`);
            if (inputEl) {
                let quantity = parseInt(inputEl.value) - 1;
                if (quantity < 1) quantity = 1;
                inputEl.value = quantity;
                updateCartItemQuantity(productId, quantity);
                updateCartTotals();
            }
        });
    });
    
    // Quantity increase buttons
    const increaseButtons = document.querySelectorAll('.increase-btn');
    increaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            const inputEl = document.querySelector(`.cart-quantity-input[data-product-id="${productId}"]`);
            if (inputEl) {
                let quantity = parseInt(inputEl.value) + 1;
                if (quantity > 99) quantity = 99;
                inputEl.value = quantity;
                updateCartItemQuantity(productId, quantity);
                updateCartTotals();
            }
        });
    });
    
    // Quantity input fields
    const quantityInputs = document.querySelectorAll('.cart-quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('change', () => {
            const productId = input.dataset.productId;
            let quantity = parseInt(input.value);
            if (isNaN(quantity) || quantity < 1) quantity = 1;
            if (quantity > 99) quantity = 99;
            input.value = quantity;
            updateCartItemQuantity(productId, quantity);
            updateCartTotals();
        });
    });
    
    // Remove buttons
    const removeButtons = document.querySelectorAll('.cart-remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            removeCartItem(productId);
            
            // Remove row from table
            const row = button.closest('tr');
            if (row) row.remove();
            
            // Update totals
            updateCartTotals();
            
            // Check if cart is empty
            if (cart.length === 0) {
                const cartEmptyEl = document.getElementById('cart-empty');
                const cartContentEl = document.getElementById('cart-content');
                
                if (cartEmptyEl) cartEmptyEl.classList.remove('hidden');
                if (cartContentEl) cartContentEl.classList.add('hidden');
            }
        });
    });
}

// Update cart totals on cart page
function updateCartTotals() {
    const currency = localStorage.getItem('shopverse-currency') || 'RON';
    const { subtotal, vat, total } = calculateCartTotals(currency);
    
    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const cartVatEl = document.getElementById('cart-vat');
    const cartTotalEl = document.getElementById('cart-total');
    
    if (cartSubtotalEl) cartSubtotalEl.textContent = formatPrice(subtotal, currency);
    if (cartVatEl) cartVatEl.textContent = formatPrice(vat, currency);
    if (cartTotalEl) cartTotalEl.textContent = formatPrice(total, currency);
}

// Initialize the cart
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    
    // Initialize cart page if we're on the cart page
    if (window.location.pathname.includes('cart.html')) {
        initCartPage();
    }
});
