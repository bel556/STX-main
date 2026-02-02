
const toggle = document.getElementById('stx-menu-toggle');
const links = document.getElementById('stx-nav-links');
const buttons = document.querySelector('.stx-buttons');

toggle.addEventListener('click', () => {
  links.classList.toggle('active');
  buttons.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (!name || !email || !password || !confirmPassword) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      alert("⚠️ Please enter a valid email address.");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
     alert("⚠️ Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one number.");
     return;
    }

    

    if (password !== confirmPassword) {
      alert("⚠️ Passwords do not match.");
      return;
    }

    alert("✅ Account created successfully!");
    window.location.href = "login.html";
  });

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
