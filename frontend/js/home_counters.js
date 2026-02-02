document.addEventListener('DOMContentLoaded', () => {
    const schoolsCountEl = document.getElementById('home-count-schools');
    const citiesCountEl = document.getElementById('home-count-cities');
    const licensesCountEl = document.getElementById('home-count-licenses');

    if (!schoolsCountEl || !citiesCountEl || !licensesCountEl) return;

    fetch('../../backend/get_counts.php')
        .then(response => response.json())
        .then(data => {
            // Animate counts for a premium feel
            animateValue(schoolsCountEl, 0, data.schoolsCount, 1500);
            animateValue(citiesCountEl, 0, data.citiesCount, 1500);
            animateValue(licensesCountEl, 0, data.licensesCount, 1500);
        })
        .catch(error => console.error('Error fetching counts:', error));

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});
