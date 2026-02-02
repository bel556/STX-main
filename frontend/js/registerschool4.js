
const toggle = document.getElementById('stx-menu-toggle');
const links = document.getElementById('stx-nav-links');
const buttons = document.querySelector('.stx-buttons');

toggle.addEventListener('click', () => {
  links.classList.toggle('active');
  buttons.classList.toggle('active');
});

const form = document.getElementById('finalisationForm');
const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

days.forEach(day => {
    const closedCheckbox = document.getElementById(`${day}Closed`);
    const startInput = document.getElementById(`${day}Start`);
    const endInput = document.getElementById(`${day}End`);

    if (closedCheckbox && startInput && endInput) {
        // Initialize state on page load
        if (closedCheckbox.checked) {
            startInput.value = '--:--';
            endInput.value = '--:--';
            startInput.disabled = true;
            endInput.disabled = true;
        }

        // Handle checkbox changes
        closedCheckbox.addEventListener('change', function () {
            if (this.checked) {
                startInput.value = '--:--';
                endInput.value = '--:--';
                startInput.disabled = true;
                endInput.disabled = true;
            } else {
                // Set default times based on day
                if (day === 'samedi') {
                    startInput.value = '09:00';
                    endInput.value = '17:00';
                } else {
                    startInput.value = '08:00';
                    endInput.value = '18:00';
                }
                startInput.disabled = false;
                endInput.disabled = false;
            }
        });
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const selectedDocuments = Array.from(document.querySelectorAll('input[name="documents"]:checked'))
        .map(cb => cb.value);

    const hours = {};
    days.forEach(day => {
        const closed = document.getElementById(`${day}Closed`).checked;
        hours[day] = {
            closed: closed,
            start: document.getElementById(`${day}Start`).value,
            end: document.getElementById(`${day}End`).value
        };
    });

    const formData = {
        ageMinimum: document.getElementById('ageMinimum').value,
        documents: selectedDocuments,
        hours: hours
    };

    console.log('Form submitted:', formData);
    alert('Auto-école inscrite avec succès!');

});
