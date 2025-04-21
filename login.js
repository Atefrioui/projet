


const authForm = document.getElementById('authForm');
const passwordInput = document.getElementById('authPassword');
const togglePasswordBtn = document.querySelector('.toggle-password');

// Toggle Password Visibility
togglePasswordBtn.addEventListener('click', function() {
  const icon = this.querySelector('i');
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  
  passwordInput.setAttribute('type', type);
  icon.classList.toggle('fa-eye-slash');
});

// Form Validation
authForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = document.getElementById('authEmail').value.trim();
  const password = passwordInput.value.trim();
  
  if (!email || !password) {
    showAlert('Please fill in all fields', 'error');
    return;
  }
  
  // Simulate successful login
  showAlert('Login successful! Redirecting...', 'success');
  
  // In real app, you would use:
  // window.location.href = 'dashboard.html';
});

// Show Alert Function
function showAlert(message, type) {
  const alertBox = document.createElement('div');
  alertBox.className = `auth-alert ${type}`;
  alertBox.textContent = message;
  
  authForm.prepend(alertBox);
  
  setTimeout(() => {
    alertBox.classList.add('fade-out');
    setTimeout(() => alertBox.remove(), 300);
  }, 3000);
}

// Add input focus effects
document.querySelectorAll('.input-group input').forEach(input => {
  input.addEventListener('focus', function() {
    this.parentNode.querySelector('label').style.color = 'var(--primary)';
  });
  
  input.addEventListener('blur', function() {
    this.parentNode.querySelector('label').style.color = 'var(--text-dark)';
  });
});