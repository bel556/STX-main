
const toggle = document.getElementById('stx-menu-toggle');
const links = document.getElementById('stx-nav-links');
const buttons = document.querySelector('.stx-buttons');

toggle.addEventListener('click', () => {
  links.classList.toggle('active');
  buttons.classList.toggle('active');
});

const form = document.getElementById('locationForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        postalCode: document.getElementById('postalCode').value,
        facebook: document.getElementById('facebook').value,
        instagram: document.getElementById('instagram').value,
        linkedin: document.getElementById('linkedin').value
    };
    console.log('Form submitted:', formData);
    // Navigate to next page
    window.location.href = 'registerschool3.html';
});

// Add input validation feedback
const inputs = document.querySelectorAll('input[required], select[required]');
inputs.forEach(input => {
    input.addEventListener('blur', function () {
        if (this.value.trim() === '') {
            this.style.borderColor = '#d32f2f';
        } else {
            this.style.borderColor = '#ddd';
        }
    });

    input.addEventListener('input', function () {
        if (this.value.trim() !== '') {
            this.style.borderColor = '#ddd';
        }
    });
});