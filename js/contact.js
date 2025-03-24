
// Contact Form JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the contact page
    if (!window.location.pathname.includes('contact.html')) return;
    
    // Initialize contact form
    initContactForm();
});

// Initialize contact form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!validateContactForm(data)) return;
        
        // Simulate form submission
        try {
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            showNotification('Your message has been sent successfully!', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        } catch (error) {
            console.error('Error sending message:', error);
            showNotification('Failed to send message. Please try again.', 'error');
        }
    });
}

// Validate contact form
function validateContactForm(data) {
    // Validate name
    if (!data.name || data.name.trim().length < 2) {
        showNotification('Please enter your name', 'error');
        return false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    // Validate message
    if (!data.message || data.message.trim().length < 10) {
        showNotification('Please enter a message (minimum 10 characters)', 'error');
        return false;
    }
    
    return true;
}
