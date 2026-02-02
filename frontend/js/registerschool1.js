const toggle = document.getElementById('stx-menu-toggle');
const links = document.getElementById('stx-nav-links');
const buttons = document.querySelector('.stx-buttons');

toggle.addEventListener('click', () => {
  links.classList.toggle('active');
  buttons.classList.toggle('active');
});

const form = document.getElementById('registrationForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const schoolName = document.getElementById('schoolName').value.trim();
    const description = document.getElementById('description').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // Check if all required fields are filled
    if (!schoolName || !description || !email || !phone) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
    }

    const formData = {
        schoolName: schoolName,
        description: description,
        email: email,
        phone: phone,
        website: document.getElementById('website').value
    };

    console.log('Form submitted:', formData);
    // Navigate to next page
    window.location.href = '../pages/registerschool2.html';
});

// Add input validation feedback
const inputs = document.querySelectorAll('input[required], textarea[required]');
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


