
// Products Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the products page
    if (!window.location.pathname.includes('products.html')) return;
    
    // Initialize filters, sorting, and product display
    initProductsPage();
    
    // Listen for currency changes
    window.addEventListener('currency-changed', () => {
        displayProducts(filterProducts());
    });
});

// Initialize the products page
function initProductsPage() {
    // Get URL parameters to determine initial filter state
    const urlParams = getUrlParams();
    
    // Set initial filter values
    if (urlParams.category) {
        document.getElementById(`category-${urlParams.category}`)?.click();
    }
    
    if (urlParams.filter === 'new') {
        // Special filter for new products
        displayNewProducts();
    } else if (urlParams.filter === 'bestsellers') {
        // Special filter for bestsellers
        displayBestsellers();
    } else {
        // Regular product display with filters
        setupFilterEvents();
        displayProducts(filterProducts());
    }
    
    // Setup event listeners for sorting
    setupSorting();
}

// Display new products
function displayNewProducts() {
    const newProducts = getNewProducts();
    
    // Update title and count
    document.getElementById('product-category-title').textContent = 'New Arrivals';
    document.getElementById('product-count').textContent = newProducts.length;
    
    // Display products
    displayProducts(newProducts);
    
    // Change active filter in UI
    updateActiveFilters('new');
}

// Display bestsellers
function displayBestsellers() {
    const bestsellers = getBestSellers();
    
    // Update title and count
    document.getElementById('product-category-title').textContent = 'Bestsellers';
    document.getElementById('product-count').textContent = bestsellers.length;
    
    // Display products
    displayProducts(bestsellers);
    
    // Change active filter in UI
    updateActiveFilters('bestsellers');
}

// Setup filter events
function setupFilterEvents() {
    // Category filters
    const categoryFilters = document.querySelectorAll('[id^="category-"]');
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', () => {
            // Special handling for "All Categories"
            if (filter.id === 'category-all' && filter.checked) {
                categoryFilters.forEach(f => {
                    if (f.id !== 'category-all') f.checked = false;
                });
            } else if (filter.checked) {
                // If a specific category is checked, uncheck "All Categories"
                document.getElementById('category-all').checked = false;
            } else {
                // If no categories are checked, check "All Categories"
                const anyCategoryChecked = Array.from(categoryFilters).some(f => f.id !== 'category-all' && f.checked);
                if (!anyCategoryChecked) {
                    document.getElementById('category-all').checked = true;
                }
            }
            
            displayProducts(filterProducts());
        });
    });
    
    // Brand filters
    const brandFilters = document.querySelectorAll('[id^="brand-"]');
    brandFilters.forEach(filter => {
        filter.addEventListener('change', () => {
            // Special handling for "All Brands"
            if (filter.id === 'brand-all' && filter.checked) {
                brandFilters.forEach(f => {
                    if (f.id !== 'brand-all') f.checked = false;
                });
            } else if (filter.checked) {
                // If a specific brand is checked, uncheck "All Brands"
                document.getElementById('brand-all').checked = false;
            } else {
                // If no brands are checked, check "All Brands"
                const anyBrandChecked = Array.from(brandFilters).some(f => f.id !== 'brand-all' && f.checked);
                if (!anyBrandChecked) {
                    document.getElementById('brand-all').checked = true;
                }
            }
            
            displayProducts(filterProducts());
        });
    });
    
    // Price range filter
    const priceRangeInput = document.getElementById('price-range');
    const priceValueDisplay = document.getElementById('price-value');
    
    if (priceRangeInput && priceValueDisplay) {
        priceRangeInput.addEventListener('input', () => {
            const currency = localStorage.getItem('shopverse-currency') || 'RON';
            priceValueDisplay.textContent = formatPrice(parseFloat(priceRangeInput.value), currency).split(' ')[0]; // Just the number, not the currency
        });
    }
    
    // Apply filters button
    document.getElementById('apply-filters')?.addEventListener('click', () => {
        displayProducts(filterProducts());
    });
    
    // Reset filters button
    document.getElementById('reset-filters')?.addEventListener('click', () => {
        resetFilters();
        displayProducts(filterProducts());
    });
}

// Setup sorting functionality
function setupSorting() {
    const sortBySelect = document.getElementById('sort-by');
    
    if (sortBySelect) {
        sortBySelect.addEventListener('change', () => {
            displayProducts(filterProducts());
        });
    }
}

// Reset all filters to default state
function resetFilters() {
    // Reset category filters
    document.getElementById('category-all').checked = true;
    document.querySelectorAll('[id^="category-"]').forEach(filter => {
        if (filter.id !== 'category-all') filter.checked = false;
    });
    
    // Reset brand filters
    document.getElementById('brand-all').checked = true;
    document.querySelectorAll('[id^="brand-"]').forEach(filter => {
        if (filter.id !== 'brand-all') filter.checked = false;
    });
    
    // Reset price range
    const priceRangeInput = document.getElementById('price-range');
    const priceValueDisplay = document.getElementById('price-value');
    
    if (priceRangeInput && priceValueDisplay) {
        priceRangeInput.value = priceRangeInput.max;
        priceValueDisplay.textContent = priceRangeInput.value;
    }
    
    // Reset sorting
    document.getElementById('sort-by').value = 'featured';
}

// Update active filters in UI
function updateActiveFilters(specialFilter) {
    // Reset all filters
    resetFilters();
    
    // Add special filter class if needed
    if (specialFilter) {
        const filtersContainer = document.querySelector('.filters-sidebar');
        if (filtersContainer) {
            filtersContainer.classList.add(`filter-${specialFilter}`);
        }
    }
}

// Apply filters to products
function filterProducts() {
    let filteredProducts = [...products];
    
    // Apply category filters
    const selectedCategories = [];
    document.querySelectorAll('[id^="category-"]:checked').forEach(filter => {
        if (filter.id !== 'category-all') {
            selectedCategories.push(filter.value);
        }
    });
    
    if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter(product => selectedCategories.includes(product.category));
    }
    
    // Apply brand filters
    const selectedBrands = [];
    document.querySelectorAll('[id^="brand-"]:checked').forEach(filter => {
        if (filter.id !== 'brand-all') {
            selectedBrands.push(filter.value);
        }
    });
    
    if (selectedBrands.length > 0) {
        filteredProducts = filteredProducts.filter(product => selectedBrands.includes(product.brand));
    }
    
    // Apply price filter
    const priceRange = document.getElementById('price-range');
    if (priceRange) {
        const maxPrice = parseFloat(priceRange.value);
        const currency = localStorage.getItem('shopverse-currency') || 'RON';
        
        filteredProducts = filteredProducts.filter(product => {
            const productPrice = convertPrice(product.price, product.currency, currency);
            return productPrice <= maxPrice;
        });
    }
    
    // Apply sorting
    const sortBy = document.getElementById('sort-by')?.value || 'featured';
    const currency = localStorage.getItem('shopverse-currency') || 'RON';
    
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => {
                const priceA = convertPrice(a.price, a.currency, currency);
                const priceB = convertPrice(b.price, b.currency, currency);
                return priceA - priceB;
            });
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => {
                const priceA = convertPrice(a.price, a.currency, currency);
                const priceB = convertPrice(b.price, b.currency, currency);
                return priceB - priceA;
            });
            break;
        case 'newest':
            filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
            break;
        default: // featured - bestsellers first, then new, then the rest
            filteredProducts.sort((a, b) => {
                if (a.isBestseller && !b.isBestseller) return -1;
                if (!a.isBestseller && b.isBestseller) return 1;
                if (a.isNew && !b.isNew) return -1;
                if (!a.isNew && b.isNew) return 1;
                return 0;
            });
    }
    
    return filteredProducts;
}

// Display products in the product grid
function displayProducts(productsToShow) {
    const productsGrid = document.getElementById('products-grid');
    const productCount = document.getElementById('product-count');
    
    if (!productsGrid) return;
    
    // Update product count
    if (productCount) {
        productCount.textContent = productsToShow.length;
    }
    
    // Update page title if a category is selected
    const selectedCategory = document.querySelector('[id^="category-"]:checked:not([id="category-all"])');
    if (selectedCategory) {
        const categoryName = getCategoryById(selectedCategory.value)?.name || selectedCategory.value;
        document.getElementById('product-category-title').textContent = categoryName;
    } else {
        document.getElementById('product-category-title').textContent = 'All Products';
    }
    
    // Clear product grid
    productsGrid.innerHTML = '';
    
    // Display products
    productsToShow.forEach(product => {
        productsGrid.innerHTML += createProductCard(product);
    });
    
    // Setup add to cart buttons
    setupAddToCartButtons();
}
