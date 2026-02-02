document.addEventListener('DOMContentLoaded', () => {
    const citySelect = document.getElementById('cities');
    const licenseSelect = document.getElementById('lisences');

    if (!citySelect || !licenseSelect) return;

    fetch('../../backend/get_filters.php')
        .then(response => response.json())
        .then(data => {
            // Populate cities
            data.cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });

            // Populate license types
            data.licenses.forEach(license => {
                const option = document.createElement('option');
                option.value = license;
                option.textContent = license;
                licenseSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching filters:', error);
        });
});
