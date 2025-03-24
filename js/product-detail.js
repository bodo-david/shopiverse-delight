
// Product Detail Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the product detail page
    if (!window.location.pathname.includes('product-detail.html')) return;
    
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        // Redirect to products page if no ID
        window.location.href = 'products.html';
        return;
    }
    
    // Get product
    const product = getProductById(productId);
    
    if (!product) {
        // Redirect to products page if product not found
        window.location.href = 'products.html';
        return;
    }
    
    // Initialize product detail page
    initProductDetail(product);
    
    // Listen for currency changes
    window.addEventListener('currency-changed', () => {
        updateProductPrices(product);
    });
});

// Initialize product detail page
function initProductDetail(product) {
    // Set page title
    document.title = `${product.name} - ShopVerse`;
    
    // Update breadcrumbs
    updateBreadcrumbs(product);
    
    // Load product images
    loadProductImages(product);
    
    // Set product info
    setProductInfo(product);
    
    // Set product attributes
    setProductAttributes(product);
    
    // Set product tabs content
    setProductTabs(product);
    
    // Load related products
    loadRelatedProducts(product.id);
    
    // Setup add to cart button
    setupAddToCartForm(product.id);
    
    // Setup tab navigation
    setupTabs();
}

// Update breadcrumbs
function updateBreadcrumbs(product) {
    const categoryLink = document.getElementById('category-link');
    const productName = document.getElementById('product-name');
    
    const category = getCategoryById(product.category);
    
    if (categoryLink) {
        categoryLink.textContent = category?.name || product.category;
        categoryLink.href = `products.html?category=${product.category}`;
    }
    
    if (productName) {
        productName.textContent = product.name;
    }
}

// Load product images
function loadProductImages(product) {
    const mainImage = document.getElementById('main-product-image');
    const thumbnailsContainer = document.getElementById('product-thumbnails');
    
    if (mainImage) {
        mainImage.src = product.images[0];
        mainImage.alt = product.name;
    }
    
    if (thumbnailsContainer) {
        thumbnailsContainer.innerHTML = '';
        
        product.images.forEach((image, index) => {
            const thumbnailHTML = `
                <div class="product-thumbnail ${index === 0 ? 'active' : ''}" data-image="${image}">
                    <img src="${image}" alt="${product.name} ${index + 1}">
                </div>
            `;
            
            thumbnailsContainer.innerHTML += thumbnailHTML;
        });
        
        // Add event listeners to thumbnails
        const thumbnails = thumbnailsContainer.querySelectorAll('.product-thumbnail');
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                // Update main image
                mainImage.src = thumbnail.dataset.image;
                
                // Update active thumbnail
                thumbnails.forEach(t => t.classList.remove('active'));
                thumbnail.classList.add('active');
            });
        });
    }
}

// Set product info
function setProductInfo(product) {
    const titleElement = document.getElementById('product-title');
    const brandElement = document.getElementById('product-brand');
    const ratingElement = document.getElementById('product-rating');
    const reviewCountElement = document.getElementById('review-count');
    const descriptionElement = document.getElementById('product-description');
    
    if (titleElement) titleElement.textContent = product.name;
    if (brandElement) brandElement.textContent = product.brand;
    
    if (ratingElement) {
        ratingElement.innerHTML = createStarRating(product.rating);
    }
    
    if (reviewCountElement) {
        reviewCountElement.textContent = `(${product.reviewCount} reviews)`;
    }
    
    if (descriptionElement) {
        descriptionElement.textContent = product.description;
    }
    
    // Update price
    updateProductPrices(product);
}

// Update product prices with current currency
function updateProductPrices(product) {
    const priceElement = document.getElementById('product-price');
    const currency = localStorage.getItem('shopverse-currency') || 'RON';
    
    if (priceElement) {
        const price = convertPrice(product.price, product.currency, currency);
        const originalPrice = product.originalPrice ? convertPrice(product.originalPrice, product.currency, currency) : null;
        
        if (originalPrice) {
            priceElement.innerHTML = `
                <span class="product-original-price">${formatPrice(originalPrice, currency)}</span>
                <span>${formatPrice(price, currency)}</span>
                <span class="vat-info">VAT included</span>
            `;
        } else {
            priceElement.innerHTML = `
                <span>${formatPrice(price, currency)}</span>
                <span class="vat-info">VAT included</span>
            `;
        }
    }
}

// Set product attributes
function setProductAttributes(product) {
    const attributesContainer = document.getElementById('product-attributes');
    
    if (!attributesContainer || !product.attributes) return;
    
    attributesContainer.innerHTML = '';
    
    for (const [name, values] of Object.entries(product.attributes)) {
        let attributeHTML = `<div class="attribute-group">`;
        attributeHTML += `<div class="attribute-name">${name}</div>`;
        
        if (Array.isArray(values)) {
            // Selectable options (like sizes or colors)
            attributeHTML += `<div class="attribute-options">`;
            values.forEach((value, index) => {
                attributeHTML += `
                    <div class="attribute-option ${index === 0 ? 'active' : ''}" data-value="${value}">
                        ${value}
                    </div>
                `;
            });
            attributeHTML += `</div>`;
        } else {
            // Single value display
            attributeHTML += `<div class="attribute-value">${values}</div>`;
        }
        
        attributeHTML += `</div>`;
        attributesContainer.innerHTML += attributeHTML;
    }
    
    // Add event listeners to selectable options
    const optionElements = attributesContainer.querySelectorAll('.attribute-option');
    optionElements.forEach(option => {
        option.addEventListener('click', () => {
            // Find all options in the same group
            const group = option.closest('.attribute-options');
            const options = group.querySelectorAll('.attribute-option');
            
            // Update active state
            options.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
        });
    });
}

// Set product tabs content
function setProductTabs(product) {
    const fullDescriptionElement = document.getElementById('full-description');
    const specsTableElement = document.getElementById('specs-table');
    const reviewsContainer = document.getElementById('reviews-container');
    
    // Description tab
    if (fullDescriptionElement) {
        fullDescriptionElement.innerHTML = `<p>${product.fullDescription || product.description}</p>`;
    }
    
    // Specifications tab
    if (specsTableElement && product.specifications) {
        specsTableElement.innerHTML = '';
        
        for (const [name, value] of Object.entries(product.specifications)) {
            const rowHTML = `
                <tr>
                    <th>${name}</th>
                    <td>${value}</td>
                </tr>
            `;
            
            specsTableElement.innerHTML += rowHTML;
        }
    }
    
    // Reviews tab
    if (reviewsContainer) {
        if (product.reviewCount > 0) {
            // If we had real reviews, we would load them here
            // For now, let's just show a placeholder
            reviewsContainer.innerHTML = `
                <div class="reviews-summary">
                    <div class="reviews-average">
                        <div class="reviews-average-rating">${product.rating.toFixed(1)}</div>
                        <div class="reviews-stars">${createStarRating(product.rating)}</div>
                        <div class="reviews-count">${product.reviewCount} reviews</div>
                    </div>
                </div>
                <div class="reviews-list">
                    <p>Reviews would be loaded here in a real implementation.</p>
                </div>
            `;
        } else {
            reviewsContainer.innerHTML = `
                <div class="no-reviews">
                    <p>This product has no reviews yet. Be the first to review it!</p>
                </div>
            `;
        }
    }
}

// Load related products
function loadRelatedProducts(productId) {
    const relatedContainer = document.getElementById('related-products');
    
    if (!relatedContainer) return;
    
    const relatedProducts = getRelatedProducts(productId);
    
    relatedContainer.innerHTML = '';
    
    relatedProducts.forEach(product => {
        relatedContainer.innerHTML += createProductCard(product);
    });
    
    // Setup add to cart buttons
    setupAddToCartButtons();
}

// Setup tabs
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update active tab pane
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Setup add to cart form
function setupAddToCartForm(productId) {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const quantityInput = document.getElementById('product-quantity');
    const decreaseBtn = document.getElementById('decrease-quantity');
    const increaseBtn = document.getElementById('increase-quantity');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value);
            addToCart(productId, quantity);
            
            // Show notification
            showNotification('Product added to cart');
        });
    }
    
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', () => {
            let quantity = parseInt(quantityInput.value) - 1;
            if (quantity < 1) quantity = 1;
            quantityInput.value = quantity;
        });
    }
    
    if (increaseBtn) {
        increaseBtn.addEventListener('click', () => {
            let quantity = parseInt(quantityInput.value) + 1;
            if (quantity > 99) quantity = 99;
            quantityInput.value = quantity;
        });
    }
    
    if (quantityInput) {
        quantityInput.addEventListener('change', () => {
            let quantity = parseInt(quantityInput.value);
            if (isNaN(quantity) || quantity < 1) quantity = 1;
            if (quantity > 99) quantity = 99;
            quantityInput.value = quantity;
        });
    }
}
