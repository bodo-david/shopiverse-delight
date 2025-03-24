
// Checkout Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the checkout page
    if (!window.location.pathname.includes('checkout.html')) return;
    
    // Initialize checkout page
    initCheckout();
    
    // Listen for currency changes
    window.addEventListener('currency-changed', () => {
        updateCheckoutPrices();
    });
});

// Initialize checkout page
function initCheckout() {
    // Load cart
    const cartItems = loadCart();
    
    // Redirect to cart if empty
    if (cartItems.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    // Initialize auth options
    setupAuthOptions();
    
    // Setup checkout steps
    setupCheckoutSteps();
    
    // Setup shipping method selection
    setupShippingMethods();
    
    // Setup payment method selection
    setupPaymentMethods();
    
    // Load order items
    loadOrderItems();
    
    // Load summary
    loadOrderSummary();
    
    // Set up form submission
    setupFormSubmission();
}

// Set up authentication options
function setupAuthOptions() {
    const loginOption = document.getElementById('login-option');
    const guestOption = document.getElementById('guest-option');
    const registerOption = document.getElementById('register-option');
    
    const loginForm = document.getElementById('login-form');
    const guestForm = document.getElementById('guest-form');
    const registerForm = document.getElementById('register-form');
    
    // Add click event listeners
    if (loginOption) {
        loginOption.addEventListener('click', () => {
            loginOption.classList.add('active');
            guestOption.classList.remove('active');
            registerOption.classList.remove('active');
            
            loginForm.classList.add('active');
            guestForm.classList.remove('active');
            registerForm.classList.remove('active');
        });
    }
    
    if (guestOption) {
        guestOption.addEventListener('click', () => {
            loginOption.classList.remove('active');
            guestOption.classList.add('active');
            registerOption.classList.remove('active');
            
            loginForm.classList.remove('active');
            guestForm.classList.add('active');
            registerForm.classList.remove('active');
        });
    }
    
    if (registerOption) {
        registerOption.addEventListener('click', () => {
            loginOption.classList.remove('active');
            guestOption.classList.remove('active');
            registerOption.classList.add('active');
            
            loginForm.classList.remove('active');
            guestForm.classList.remove('active');
            registerForm.classList.add('active');
        });
    }
    
    // Setup login form
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            if (!email || !password) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // In a real application, we would handle login here
            showNotification('Login functionality would be implemented in a real application', 'info');
        });
    }
}

// Set up checkout steps
function setupCheckoutSteps() {
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const formSteps = document.querySelectorAll('.form-step');
    
    // Handle next step buttons
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentStep = parseInt(button.closest('.form-step').dataset.step);
            const nextStep = parseInt(button.dataset.next);
            
            // Validate current step
            if (!validateStep(currentStep)) return;
            
            // Update progress
            progressSteps.forEach(step => {
                if (parseInt(step.dataset.step) <= nextStep) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active');
                }
            });
            
            // Show next step
            formSteps.forEach(step => {
                if (parseInt(step.dataset.step) === nextStep) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active');
                }
            });
            
            // Scroll to top of form
            button.closest('form').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Handle previous step buttons
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            const prevStep = parseInt(button.dataset.prev);
            
            // Update progress
            progressSteps.forEach(step => {
                if (parseInt(step.dataset.step) <= prevStep) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active');
                }
            });
            
            // Show previous step
            formSteps.forEach(step => {
                if (parseInt(step.dataset.step) === prevStep) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active');
                }
            });
            
            // Scroll to top of form
            button.closest('form').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Validate checkout step
function validateStep(step) {
    switch (step) {
        case 1: // Customer Information
            const authOption = document.querySelector('.auth-option.active').id;
            
            if (authOption === 'login-option') {
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;
                
                if (!email || !password) {
                    showNotification('Please fill in all required fields', 'error');
                    return false;
                }
            } else if (authOption === 'guest-option' || authOption === 'register-option') {
                const formId = authOption === 'guest-option' ? '' : 'reg-';
                const firstName = document.getElementById(`${formId}first-name`).value;
                const lastName = document.getElementById(`${formId}last-name`).value;
                const email = document.getElementById(`${formId}email`).value;
                
                if (!firstName || !lastName || !email) {
                    showNotification('Please fill in all required fields', 'error');
                    return false;
                }
                
                if (authOption === 'register-option') {
                    const password = document.getElementById('reg-password').value;
                    const confirmPassword = document.getElementById('reg-confirm-password').value;
                    const termsAgreed = document.getElementById('terms-agree').checked;
                    
                    if (!password || !confirmPassword) {
                        showNotification('Please fill in all required fields', 'error');
                        return false;
                    }
                    
                    if (password !== confirmPassword) {
                        showNotification('Passwords do not match', 'error');
                        return false;
                    }
                    
                    if (!termsAgreed) {
                        showNotification('Please agree to the Terms & Conditions', 'error');
                        return false;
                    }
                }
            }
            break;
        
        case 2: // Shipping Information
            const address = document.getElementById('address').value;
            const city = document.getElementById('city').value;
            const zip = document.getElementById('zip').value;
            const country = document.getElementById('country').value;
            const shippingMethod = document.querySelector('input[name="shipping-method"]:checked');
            
            if (!address || !city || !zip || !country || !shippingMethod) {
                showNotification('Please fill in all required fields', 'error');
                return false;
            }
            break;
        
        case 3: // Payment Method
            const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
            
            if (!paymentMethod) {
                showNotification('Please select a payment method', 'error');
                return false;
            }
            break;
        
        case 4: // Review
            const orderTerms = document.getElementById('order-terms').checked;
            
            if (!orderTerms) {
                showNotification('Please agree to the Terms & Conditions', 'error');
                return false;
            }
            break;
    }
    
    return true;
}

// Set up shipping method selection
function setupShippingMethods() {
    const shippingMethods = document.getElementsByName('shipping-method');
    const currency = localStorage.getItem('shopverse-currency') || 'RON';
    
    // Update shipping prices
    SHIPPING_METHODS.forEach(method => {
        const price = convertPrice(method.price, 'RON', currency);
        const priceElement = document.getElementById(`${method.id}-service-price`);
        if (priceElement) {
            priceElement.textContent = formatPrice(price, currency);
        }
    });
    
    // Add change event listeners
    shippingMethods.forEach(method => {
        method.addEventListener('change', () => {
            updateOrderSummary();
        });
    });
}

// Set up payment method selection
function setupPaymentMethods() {
    const paymentMethods = document.getElementsByName('payment-method');
    const bankTransferInfo = document.getElementById('bank-transfer-info');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', () => {
            if (method.value === 'bank') {
                bankTransferInfo.classList.remove('hidden');
            } else {
                bankTransferInfo.classList.add('hidden');
            }
            
            updateOrderSummary();
            updateReviewPayment();
        });
    });
}

// Load order items
function loadOrderItems() {
    const cartItems = loadCart();
    const summaryItemsContainer = document.getElementById('summary-items');
    const reviewItemsContainer = document.getElementById('review-items');
    const currency = localStorage.getItem('shopverse-currency') || 'RON';
    
    let summaryHTML = '';
    let reviewHTML = '';
    
    cartItems.forEach(item => {
        const product = getProductById(item.productId);
        if (!product) return;
        
        const price = convertPrice(product.price, product.currency, currency);
        const total = price * item.quantity;
        
        // Summary item
        summaryHTML += `
            <div class="summary-item">
                <div class="summary-item-image">
                    <img src="${product.thumbnail || product.images[0]}" alt="${product.name}">
                </div>
                <div class="summary-item-info">
                    <h4>${product.name}</h4>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <div class="summary-item-price">
                    ${formatPrice(total, currency)}
                </div>
            </div>
        `;
        
        // Review item
        reviewHTML += `
            <tr>
                <td>${product.name}</td>
                <td>${item.quantity}</td>
                <td>${formatPrice(total, currency)}</td>
            </tr>
        `;
    });
    
    if (summaryItemsContainer) summaryItemsContainer.innerHTML = summaryHTML;
    if (reviewItemsContainer) reviewItemsContainer.innerHTML = reviewHTML;
}

// Load order summary
function loadOrderSummary() {
    updateOrderSummary();
}

// Update order summary
function updateOrderSummary() {
    const currency = localStorage.getItem('shopverse-currency') || 'RON';
    const cartItems = loadCart();
    
    // Calculate subtotal
    let subtotal = 0;
    cartItems.forEach(item => {
        const product = getProductById(item.productId);
        if (!product) return;
        
        const price = convertPrice(product.price, product.currency, currency);
        subtotal += price * item.quantity;
    });
    
    // Get shipping cost
    const selectedShipping = document.querySelector('input[name="shipping-method"]:checked');
    const shippingMethod = selectedShipping ? SHIPPING_METHODS.find(m => m.id === selectedShipping.value) : null;
    const shippingCost = shippingMethod ? convertPrice(shippingMethod.price, 'RON', currency) : 0;
    
    // Calculate VAT
    const vat = (subtotal + shippingCost) * 0.19;
    
    // Calculate total
    const total = subtotal + shippingCost + vat;
    
    // Update summary
    const subtotalEl = document.getElementById('summary-subtotal');
    const shippingEl = document.getElementById('summary-shipping');
    const vatEl = document.getElementById('summary-vat');
    const totalEl = document.getElementById('summary-total');
    
    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal, currency);
    if (shippingEl) shippingEl.textContent = formatPrice(shippingCost, currency);
    if (vatEl) vatEl.textContent = formatPrice(vat, currency);
    if (totalEl) totalEl.textContent = formatPrice(total, currency);
    
    // Update review sections
    updateReviewCustomer();
    updateReviewShipping();
    updateReviewPayment();
}

// Update customer review section
function updateReviewCustomer() {
    const reviewCustomer = document.getElementById('review-customer');
    const authOption = document.querySelector('.auth-option.active').id;
    
    if (!reviewCustomer) return;
    
    let customerInfo = '';
    
    if (authOption === 'login-option') {
        const email = document.getElementById('login-email').value;
        if (email) {
            customerInfo = `<p>${email}</p>`;
        }
    } else {
        const formId = authOption === 'guest-option' ? '' : 'reg-';
        const firstName = document.getElementById(`${formId}first-name`).value;
        const lastName = document.getElementById(`${formId}last-name`).value;
        const email = document.getElementById(`${formId}email`).value;
        
        if (firstName && lastName && email) {
            customerInfo = `
                <p>${firstName} ${lastName}</p>
                <p>${email}</p>
            `;
        }
    }
    
    reviewCustomer.innerHTML = customerInfo;
}

// Update shipping review section
function updateReviewShipping() {
    const reviewShipping = document.getElementById('review-shipping');
    
    if (!reviewShipping) return;
    
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const zip = document.getElementById('zip').value;
    const country = document.getElementById('country').value;
    const shippingMethod = document.querySelector('input[name="shipping-method"]:checked');
    
    if (address && city && zip && country && shippingMethod) {
        const selectedShipping = SHIPPING_METHODS.find(m => m.id === shippingMethod.value);
        const currency = localStorage.getItem('shopverse-currency') || 'RON';
        const shippingCost = convertPrice(selectedShipping.price, 'RON', currency);
        
        reviewShipping.innerHTML = `
            <p>${address}</p>
            <p>${city}, ${zip}</p>
            <p>${country}</p>
            <p class="mt-2"><strong>Shipping Method:</strong> ${selectedShipping.name} - ${formatPrice(shippingCost, currency)}</p>
        `;
    }
}

// Update payment review section
function updateReviewPayment() {
    const reviewPayment = document.getElementById('review-payment');
    
    if (!reviewPayment) return;
    
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
    
    if (paymentMethod) {
        let paymentInfo = '';
        
        if (paymentMethod.value === 'cash') {
            paymentInfo = 'Cash on Delivery';
        } else if (paymentMethod.value === 'bank') {
            paymentInfo = 'Bank Transfer';
        }
        
        reviewPayment.innerHTML = `<p>${paymentInfo}</p>`;
    }
}

// Set up form submission
function setupFormSubmission() {
    const checkoutForm = document.getElementById('checkout-form');
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate final step
            if (!validateStep(4)) return;
            
            // In a real application, we would handle order submission here
            showNotification('Order processed successfully!', 'success');
            
            // Clear cart and redirect to success page
            setTimeout(() => {
                clearCart();
                window.location.href = 'order-success.html';
            }, 2000);
        });
    }
}
