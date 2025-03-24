
// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const cartCountElements = document.querySelectorAll('.cart-count');
const currencySelectors = document.querySelectorAll('#currency-selector');
const cookieNotice = document.getElementById('cookie-notice');
const acceptCookiesBtn = document.getElementById('accept-cookies');

// Mobile Menu Toggle
function setupMobileMenu() {
    // Create mobile menu if it doesn't exist
    if (!document.querySelector('.mobile-menu')) {
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        
        // Clone the navigation and other elements for mobile
        const navClone = document.querySelector('.main-nav .nav-list').cloneNode(true);
        navClone.className = 'mobile-menu-list';
        
        // Setup dropdown functionality
        const dropdowns = navClone.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            const submenu = dropdown.querySelector('.dropdown-menu');
            
            // Convert to mobile-friendly markup
            submenu.className = 'mobile-submenu';
            
            // Create toggle button
            const toggleIcon = document.createElement('span');
            toggleIcon.className = 'mobile-menu-toggle-icon';
            toggleIcon.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
            
            // Replace original link
            const newLink = document.createElement('div');
            newLink.className = 'mobile-menu-dropdown';
            newLink.appendChild(link.cloneNode(true));
            newLink.appendChild(toggleIcon);
            link.parentNode.replaceChild(newLink, link);
            
            // Add click event
            newLink.addEventListener('click', (e) => {
                e.preventDefault();
                toggleIcon.classList.toggle('active');
                submenu.classList.toggle('active');
            });
        });
        
        // Add currency selector
        const currencySelector = document.createElement('div');
        currencySelector.className = 'mobile-menu-currency';
        currencySelector.innerHTML = `
            <label for="mobile-currency-selector">Currency</label>
            <select id="mobile-currency-selector">
                <option value="RON">RON</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
            </select>
        `;
        
        // Add action buttons
        const actionButtons = document.createElement('div');
        actionButtons.className = 'mobile-menu-actions';
        actionButtons.innerHTML = `
            <a href="login.html" class="btn btn-outline">Sign In</a>
            <a href="cart.html" class="btn btn-primary">View Cart</a>
        `;
        
        // Assemble the mobile menu
        mobileMenu.appendChild(navClone);
        mobileMenu.appendChild(currencySelector);
        mobileMenu.appendChild(actionButtons);
        
        // Add to the body
        document.body.appendChild(mobileMenu);
        
        // Setup currency sync
        const mobileCurrencySelector = document.getElementById('mobile-currency-selector');
        if (mobileCurrencySelector) {
            mobileCurrencySelector.addEventListener('change', (e) => {
                setCurrency(e.target.value);
                updateCurrencySelectors(e.target.value);
            });
        }
    }
    
    // Toggle mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            const mobileMenu = document.querySelector('.mobile-menu');
            mobileMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
}

// Initialize currency
function initCurrency() {
    // Get saved currency or default to RON
    const savedCurrency = localStorage.getItem('shopverse-currency') || 'RON';
    
    // Update all selectors
    updateCurrencySelectors(savedCurrency);
    
    // Add event listeners to currency selectors
    currencySelectors.forEach(selector => {
        selector.addEventListener('change', (e) => {
            setCurrency(e.target.value);
            updateCurrencySelectors(e.target.value);
        });
    });
}

// Update all currency selectors
function updateCurrencySelectors(currency) {
    currencySelectors.forEach(selector => {
        selector.value = currency;
    });
    
    const mobileCurrencySelector = document.getElementById('mobile-currency-selector');
    if (mobileCurrencySelector) {
        mobileCurrencySelector.value = currency;
    }
}

// Set currency and save to localStorage
function setCurrency(currency) {
    localStorage.setItem('shopverse-currency', currency);
    // Dispatch an event so other scripts can react to currency changes
    window.dispatchEvent(new CustomEvent('currency-changed', { detail: { currency } }));
}

// Initialize cookie notice
function initCookieNotice() {
    const cookiesAccepted = localStorage.getItem('cookies-accepted');
    
    if (!cookiesAccepted && cookieNotice) {
        cookieNotice.style.display = 'block';
        
        if (acceptCookiesBtn) {
            acceptCookiesBtn.addEventListener('click', () => {
                localStorage.setItem('cookies-accepted', 'true');
                cookieNotice.style.display = 'none';
            });
        }
    } else if (cookieNotice) {
        cookieNotice.style.display = 'none';
    }
}

// Initialize the application
function initApp() {
    setupMobileMenu();
    initCurrency();
    initCookieNotice();
    
    // Update cart count from localStorage
    updateCartCount();
    
    // Listen for storage events (for multi-tab support)
    window.addEventListener('storage', (e) => {
        if (e.key === 'shopverse-cart') {
            updateCartCount();
        }
    });
}

// Update cart count from localStorage
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('shopverse-cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Load image (with placeholder fallback)
function loadImage(src, fallbackSrc = 'images/placeholder.jpg') {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => resolve(fallbackSrc);
        img.src = src;
    });
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Create stars rating HTML
function createStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fa-solid fa-star star"></i>';
    }
    
    // Add half star if needed
    if (hasHalfStar) {
        starsHTML += '<i class="fa-solid fa-star-half-alt star"></i>';
    }
    
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="fa-regular fa-star star"></i>';
    }
    
    return starsHTML;
}

// Get URL parameters
function getUrlParams() {
    const searchParams = new URLSearchParams(window.location.search);
    const params = {};
    
    for (const [key, value] of searchParams) {
        params[key] = value;
    }
    
    return params;
}

// Create product card HTML
function createProductCard(product) {
    const currentCurrency = localStorage.getItem('shopverse-currency') || 'RON';
    const price = convertPrice(product.price, product.currency, currentCurrency);
    const originalPrice = product.originalPrice ? convertPrice(product.originalPrice, product.currency, currentCurrency) : null;
    
    const badgesHTML = `
        <div class="product-badges">
            ${product.isNew ? '<span class="product-badge badge-new">New</span>' : ''}
            ${product.onSale ? '<span class="product-badge badge-sale">Sale</span>' : ''}
            ${product.isBestseller ? '<span class="product-badge badge-bestseller">Bestseller</span>' : ''}
        </div>
    `;
    
    const priceHTML = originalPrice ? 
        `<div class="product-price">
            <span class="product-original-price">${formatPrice(originalPrice, currentCurrency)}</span>
            <span>${formatPrice(price, currentCurrency)}</span>
        </div>` : 
        `<div class="product-price">
            <span>${formatPrice(price, currentCurrency)}</span>
        </div>`;
    
    return `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.thumbnail || product.images[0]}" alt="${product.name}">
                ${badgesHTML}
                <div class="product-actions">
                    <button class="product-action-btn add-to-cart-btn" data-product-id="${product.id}">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                    <a href="product-detail.html?id=${product.id}" class="product-action-btn">
                        <i class="fa-solid fa-eye"></i>
                    </a>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${getCategoryById(product.category)?.name || product.category}</div>
                <h3 class="product-title">
                    <a href="product-detail.html?id=${product.id}">${product.name}</a>
                </h3>
                ${priceHTML}
            </div>
        </div>
    `;
}

// Add event listeners to "Add to Cart" buttons
function setupAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            addToCart(productId, 1);
            
            // Show a notification
            showNotification('Product added to cart');
        });
    });
}

// Show notification
function showNotification(message, type = 'success', duration = 3000) {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
        
        // Add styles if not already in CSS
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    padding: 12px 20px;
                    background-color: #4caf50;
                    color: white;
                    border-radius: 4px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    z-index: 1000;
                    transform: translateY(100px);
                    opacity: 0;
                    transition: transform 0.3s ease, opacity 0.3s ease;
                }
                .notification.show {
                    transform: translateY(0);
                    opacity: 1;
                }
                .notification.error {
                    background-color: #f44336;
                }
                .notification.warning {
                    background-color: #ff9800;
                }
                .notification.info {
                    background-color: #2196f3;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Clear previous notification content and classes
    notification.textContent = message;
    notification.className = 'notification';
    
    // Add type class
    if (type !== 'success') {
        notification.classList.add(type);
    }
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide after duration
    setTimeout(() => {
        notification.classList.remove('show');
    }, duration);
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
