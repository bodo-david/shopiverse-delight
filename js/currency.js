
// Currency operations

// Initialize currency
document.addEventListener('DOMContentLoaded', () => {
    // Get saved currency or default to RON
    const savedCurrency = localStorage.getItem('shopverse-currency') || 'RON';
    
    // Update all currency selectors
    const currencySelectors = document.querySelectorAll('#currency-selector');
    currencySelectors.forEach(selector => {
        selector.value = savedCurrency;
        
        // Add event listener
        selector.addEventListener('change', (e) => {
            setCurrency(e.target.value);
        });
    });
    
    // Initialize mobile currency selector if exists
    const mobileCurrencySelector = document.getElementById('mobile-currency-selector');
    if (mobileCurrencySelector) {
        mobileCurrencySelector.value = savedCurrency;
        
        mobileCurrencySelector.addEventListener('change', (e) => {
            setCurrency(e.target.value);
        });
    }
    
    // Update prices if needed
    updatePricesDisplay(savedCurrency);
});

// Set currency
function setCurrency(currency) {
    localStorage.setItem('shopverse-currency', currency);
    
    // Update all selectors
    const currencySelectors = document.querySelectorAll('#currency-selector');
    currencySelectors.forEach(selector => {
        selector.value = currency;
    });
    
    // Update mobile selector if exists
    const mobileCurrencySelector = document.getElementById('mobile-currency-selector');
    if (mobileCurrencySelector) {
        mobileCurrencySelector.value = currency;
    }
    
    // Update prices
    updatePricesDisplay(currency);
    
    // Dispatch event for currency changes
    window.dispatchEvent(new CustomEvent('currency-changed', { detail: { currency } }));
}

// Update prices display
function updatePricesDisplay(currency) {
    // Pages with product listings
    if (document.querySelector('.product-grid')) {
        updateProductGridPrices(currency);
    }
    
    // Product detail page
    if (document.getElementById('product-price')) {
        updateProductDetailPrice(currency);
    }
    
    // Cart page
    if (document.getElementById('cart-subtotal')) {
        updateCartPrices(currency);
    }
    
    // Checkout page
    if (document.getElementById('summary-subtotal')) {
        updateCheckoutPrices(currency);
    }
}

// Update product grid prices
function updateProductGridPrices(currency) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productId = card.querySelector('.add-to-cart-btn')?.dataset.productId;
        if (!productId) return;
        
        const product = getProductById(productId);
        if (!product) return;
        
        const price = convertPrice(product.price, product.currency, currency);
        const originalPrice = product.originalPrice ? convertPrice(product.originalPrice, product.currency, currency) : null;
        
        const priceEl = card.querySelector('.product-price');
        if (!priceEl) return;
        
        if (originalPrice) {
            priceEl.innerHTML = `
                <span class="product-original-price">${formatPrice(originalPrice, currency)}</span>
                <span>${formatPrice(price, currency)}</span>
            `;
        } else {
            priceEl.innerHTML = `<span>${formatPrice(price, currency)}</span>`;
        }
    });
}

// Update product detail price
function updateProductDetailPrice(currency) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) return;
    
    const product = getProductById(productId);
    if (!product) return;
    
    const price = convertPrice(product.price, product.currency, currency);
    const originalPrice = product.originalPrice ? convertPrice(product.originalPrice, product.currency, currency) : null;
    
    const priceEl = document.getElementById('product-price');
    
    if (originalPrice) {
        priceEl.innerHTML = `
            <span class="product-original-price">${formatPrice(originalPrice, currency)}</span>
            <span>${formatPrice(price, currency)}</span>
            <span class="vat-info">VAT included</span>
        `;
    } else {
        priceEl.innerHTML = `
            <span>${formatPrice(price, currency)}</span>
            <span class="vat-info">VAT included</span>
        `;
    }
}

// Update cart prices
function updateCartPrices(currency) {
    // This function is handled in cart.js
    // The currency-changed event will trigger the update
}

// Update checkout prices
function updateCheckoutPrices(currency) {
    // This function is handled in checkout.js
    // The currency-changed event will trigger the update
}
