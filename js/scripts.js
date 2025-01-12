
window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});



// Contact form submission
document.getElementById('submitButton').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get the form element
    const form = document.getElementById('contactForm');

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    // Clear previous validation messages
    clearValidationMessages();

    // Validate form values
    let isValid = true;

    if (!name) {
        showValidationMessage('name', 'Please enter your name.');
        isValid = false;
    }

    if (!email || !validateEmail(email)) {
        showValidationMessage('email', 'Please enter a valid email address.');
        isValid = false;
    }

    if (!phone || !validatePhone(phone)) {
        showValidationMessage('phone', 'Please enter a valid phone number.');
        isValid = false;
    }

    if (!message) {
        showValidationMessage('message', 'Please enter your message.');
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    // Define the recipient's phone number in the correct format with country code
    const recipientPhone = "966593673722"; // Replace '966' with your country code and remove leading '0'

    // Construct WhatsApp message
    const whatsappMessage = `Hello!%0A%0AMy name is: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0APhone: ${encodeURIComponent(phone)}%0AMessage: ${encodeURIComponent(message)}`;

    // Open WhatsApp in a new tab
    window.open(`https://wa.me/${recipientPhone}?text=${whatsappMessage}`, '_blank');

    // Reset the form
    form.reset();
});

// Helper function to validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Helper function to validate phone number
function validatePhone(phone) {
    const re = /^\d{10,15}$/; // Adjust the regex to match your phone number format
    return re.test(phone);
}

// Helper function to show validation messages
function showValidationMessage(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.createElement('div');
    errorElement.className = 'validation-message';
    errorElement.innerText = message;
    field.parentNode.appendChild(errorElement);
}

// Helper function to clear validation messages
function clearValidationMessages() {
    const messages = document.querySelectorAll('.validation-message');
    messages.forEach(message => message.remove());
}

// Remove hash from URL
window.addEventListener('hashchange', function() {
    history.replaceState(null, null, ' ');
});


document.addEventListener('DOMContentLoaded', function() {
    const modals = document.querySelectorAll('.portfolio-modal');
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    modals.forEach(modal => {
        let firstFocusableElement;
        let lastFocusableElement;

        modal.addEventListener('show.bs.modal', function() {
            const focusableContent = modal.querySelectorAll(focusableElements);
            firstFocusableElement = focusableContent[0];
            lastFocusableElement = focusableContent[focusableContent.length - 1];

            firstFocusableElement.focus();

            modal.addEventListener('keydown', trapFocus);
        });

        modal.addEventListener('hide.bs.modal', function() {
            modal.removeEventListener('keydown', trapFocus);
        });

        function trapFocus(event) {
            if (event.key === 'Tab') {
                if (event.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        event.preventDefault();
                        lastFocusableElement.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        event.preventDefault();
                        firstFocusableElement.focus();
                    }
                }
            }
        }
    });
});