

const toggle = document.getElementById('stx-menu-toggle');
const links = document.getElementById('stx-nav-links');
const buttons = document.querySelector('.stx-buttons');

toggle.addEventListener('click', () => {
  links.classList.toggle('active');
  buttons.classList.toggle('active');
});

const form = document.getElementById('servicesForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get selected permits
    const selectedPermis = Array.from(document.querySelectorAll('input[name="permis"]:checked'))
        .map(cb => cb.value);

    // Get selected services
    const selectedServices = Array.from(document.querySelectorAll('input[name="services"]:checked'))
        .map(cb => cb.value);

    const formData = {
        permis: selectedPermis,
        tarif: document.getElementById('tarif').value,
        services: selectedServices
    };

    // Validate at least one permit is selected
    if (selectedPermis.length === 0) {
        alert('Veuillez sélectionner au moins un type de permis');
        return;
    }

    console.log('Form submitted:', formData);
    window.location.href = 'registerschool4.html';
});
// Add validation feedback for tarif input
const tarifInput = document.getElementById('tarif');
tarifInput.addEventListener('blur', function () {
    if (this.value.trim() === '') {
        this.style.borderColor = '#d32f2f';
    } else {
        this.style.borderColor = '#ddd';
    }
});

tarifInput.addEventListener('input', function () {
    if (this.value.trim() !== '') {
        this.style.borderColor = '#ddd';
    }
});