
const toggle = document.getElementById('stx-menu-toggle');
const links = document.getElementById('stx-nav-links');
const buttons = document.querySelector('.stx-buttons');

toggle.addEventListener('click', () => {
  links.classList.toggle('active');
  buttons.classList.toggle('active');
});

document.getElementById("recherche-button").addEventListener("click", function () {
  const searchText = document.getElementById("home-search-input").value;
  const city = document.getElementById("cities").value;
  const license = document.getElementById("lisences").value;

  const params = new URLSearchParams();
  if (searchText) params.append('name', searchText);
  if (city !== 'all') params.append('city', city);
  if (license !== 'all') params.append('license', license);

  window.location.href = "../pages/search.html?" + params.toString();
});
