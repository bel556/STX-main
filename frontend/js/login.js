
const toggle = document.getElementById('stx-menu-toggle');
const links = document.getElementById('stx-nav-links');
const buttons = document.querySelector('.stx-buttons');

toggle.addEventListener('click', () => {
  links.classList.toggle('active');
  buttons.classList.toggle('active');
});

// Wait until the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const emailInput = document.querySelector('input[type="email"]');
  const passwordInput = document.querySelector('input[type="password"]');

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent page reload

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Simulate login (you can replace this part with real backend logic later)
    if (email === "test@example.com" && password === "123456") {
      alert("✅ Login successful!");
      window.location.href = "index.html"; // redirect to homepage
    } else {
      alert("❌ Incorrect email or password.");
    }
  });

  // Utility function for validating email format
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
