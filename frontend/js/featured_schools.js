document.addEventListener('DOMContentLoaded', () => {
    const featuredContainer = document.getElementById('featured-schools-results');
    const modalOverlay = document.getElementById('school-modal');
    const closeModal = document.querySelector('.close-modal');

    if (!featuredContainer) return;

    // Fetch featured schools
    fetch('../../backend/get_featured_schools.php')
        .then(response => response.json())
        .then(data => {
            renderFeaturedSchools(data);
        })
        .catch(error => console.error('Error fetching featured schools:', error));

    function renderFeaturedSchools(schools) {
        featuredContainer.innerHTML = '';
        if (schools.length === 0) {
            featuredContainer.style.display = 'none';
            return;
        }

        schools.forEach(school => {
            const card = document.createElement('div');
            card.className = 'school-card';

            const initial = school.school_name.charAt(0);
            const statusClass = `status-${school.status.toLowerCase()}`;

            const description = school.description_school.length > 100
                ? school.description_school.substring(0, 100) + '...'
                : school.description_school;

            const socialIcons = school.social_media.map(sm => {
                let iconPath = '';
                const type = sm.type.toLowerCase();
                if (type.includes('facebook')) iconPath = '../src/img/facebookpng.png';
                else if (type.includes('linkedin')) iconPath = '../src/img/share-linkedin.png';
                else if (type.includes('twitter') || type.includes('x')) iconPath = '../src/img/share-twitter.png';
                else if (type.includes('tiktok')) iconPath = '../src/img/tiktok.png';
                else iconPath = '../src/img/share-messenger.png';

                return `<a href="${sm.link}" target="_blank" class="card-social-icon" onclick="event.stopPropagation()">
                            <img src="${iconPath}" alt="${sm.type}">
                        </a>`;
            }).join('');

            card.innerHTML = `
                <div class="school-card-top">
                    <div class="school-initial">${initial}</div>
                    <div class="school-header-info">
                        <h3 class="school-name">${school.school_name}</h3>
                        <div class="status-indicator ${statusClass}">
                            <span class="status-dot"></span>
                            ${school.status}
                        </div>
                    </div>
                </div>
                <div class="school-card-middle">
                    <div class="school-address">📍 ${school.city}, ${school.adress_school}</div>
                    <p class="school-card-description">${description}</p>
                </div>
                <div class="school-card-bottom">
                    <div class="school-price">${school.unit_price} <span>DA/h</span></div>
                    <div class="school-card-social">
                        ${socialIcons}
                    </div>
                </div>
            `;

            card.addEventListener('click', () => openModal(school));
            featuredContainer.appendChild(card);
        });
    }

    function openModal(school) {
        if (!modalOverlay) return;
        const modalBody = document.querySelector('.modal-body');
        const modalInitial = document.getElementById('modal-initial');
        const modalName = document.getElementById('modal-name');

        modalInitial.textContent = school.school_name.charAt(0);
        modalName.textContent = school.school_name;

        modalBody.innerHTML = `
            <div class="modal-left">
                <div class="info-group">
                    <span class="info-label">Adresse</span>
                    <div class="info-value">${school.adress_school}, ${school.city}</div>
                </div>
                <div class="info-group">
                    <span class="info-label">Statut</span>
                    <div class="status-indicator status-${school.status.toLowerCase()}">
                        <span class="status-dot"></span>
                        ${school.status}
                    </div>
                </div>
                <div class="info-group">
                    <span class="info-label">Tarif</span>
                    <div class="school-price">${school.unit_price} <span>DA / heure</span></div>
                </div>
                <div class="info-group">
                    <span class="info-label">Description</span>
                    <div class="info-value">${school.description_school}</div>
                </div>
                <div class="info-group">
                    <span class="info-label">Types de permis</span>
                    <div class="tag-container">
                        ${school.licenses.map(l => `<span class="tag">${l}</span>`).join('')}
                    </div>
                </div>
            </div>
            <div class="modal-right">
                <div class="info-group">
                    <span class="info-label">Services offerts</span>
                    <div class="tag-container">
                        ${school.services.map(s => `<span class="tag">${s}</span>`).join('')}
                    </div>
                </div>
                <div class="info-group">
                    <span class="info-label">Documents requis</span>
                    <div class="tag-container">
                        ${school.documents.map(d => `<span class="tag">${d}</span>`).join('')}
                    </div>
                </div>
                <div class="info-group">
                    <span class="info-label">Horaires</span>
                    <div class="timetable-list">
                        ${school.timetable.map(t => `
                            <div class="timetable-item">
                                <span>${t.day}</span>
                                <span>${t.opening.substring(0, 5)} - ${t.closing.substring(0, 5)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="info-group">
                    <span class="info-label">Réseaux sociaux</span>
                    <div class="social-links">
                        ${school.social_media.map(sm => `
                            <a href="${sm.link}" target="_blank" class="social-link">🌐 ${sm.type}</a>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
