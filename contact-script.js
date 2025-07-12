/*
 * =========================================
 * JAVASCRIPT FOR: CONTACT PAGE
 * =========================================
 * This script handles form validation and the
 * interactive button animation on contact.html.
 * =========================================
 */
document.addEventListener('DOMContentLoaded', () => {

    const contactForm = document.getElementById('contactForm');

    // If the contact form doesn't exist on the page, do nothing.
    if (!contactForm) {
        return;
    }

    // Get the button and its text element for the animation.
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.button-text');

    /**
     * A helper function to validate a single form field.
     * @param {string} fieldId - The ID of the input/textarea element.
     * @param {string} errorId - The ID of the error message paragraph.
     * @param {function} validationFn - A function that returns true if the field's value is valid.
     * @returns {boolean} - True if the field is valid, false otherwise.
     */
    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        if (!field) return false;

        const isValid = validationFn(field.value);

        // Show or hide the error message based on validity.
        if (error) {
            error.style.display = isValid ? 'none' : 'block';
        }
        // Change the border color to red if invalid, or back to the default if valid.
        field.style.borderColor = isValid ? 'var(--color-subtle)' : '#ff8a80';
        return isValid;
    }

    // Listen for the form's submit event.
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission.

        // Validate all required fields.
        const isNameValid = validateField('name', 'name-error', val => val.trim() !== '');
        const isEmailValid = validateField('email', 'email-error', val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));
        const isSubjectValid = validateField('subject', 'subject-error', val => val.trim() !== '');
        const isMessageValid = validateField('message', 'message-error', val => val.trim().length >= 20);

        // Check if all fields are valid and the button is not already sending.
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid && !submitButton.classList.contains('is-sending')) {
            
            // --- TRIGGER THE ANIMATION ---

            // 1. Add the 'is-sending' class to start the animation.
            submitButton.classList.add('is-sending');
            buttonText.textContent = 'Sending...'; // Update text for screen readers.

            // 2. After the animation plays, simulate success.
            setTimeout(() => {
                // Add the 'is-sent' class to turn the button green.
                submitButton.classList.add('is-sent');
                buttonText.textContent = 'Sent!'; // Update text to show success.

                // In a real application, you would submit the form data here, e.g., using fetch().
                // For this demo, we'll just show an alert.
                // alert('Thank you for your message! It has been sent.');

            }, 1500); // This delay should be slightly longer than the animation duration.

            // 3. Reset the form and button after a few seconds.
            setTimeout(() => {
                submitButton.classList.remove('is-sending');
                submitButton.classList.remove('is-sent');
                buttonText.textContent = 'Send Message';
                contactForm.reset();
                // Reset border colors on all fields.
                ['name', 'email', 'subject', 'message'].forEach(id => {
                    document.getElementById(id).style.borderColor = 'var(--color-subtle)';
                });
            }, 3500); // A longer delay before the button resets.
        }
    });
});