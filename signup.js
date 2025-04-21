// DOM Elements
const signupForm = document.getElementById('signupForm');
const passwordInput = document.getElementById('signupPassword');
const confirmInput = document.getElementById('signupConfirm');
const togglePasswordBtn = document.querySelector('.toggle-password');
const strengthBars = document.querySelectorAll('.strength-bar');
const strengthText = document.querySelector('.strength-text');

// Toggle Password Visibility
if (togglePasswordBtn) {
  togglePasswordBtn.addEventListener('click', function() {
    const icon = this.querySelector('i');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    
    passwordInput.setAttribute('type', type);
    icon.classList.toggle('fa-eye-slash');
  });
}

// Password Strength Checker
if (passwordInput) {
  passwordInput.addEventListener('input', function() {
    const password = this.value;
    const strength = checkPasswordStrength(password);
    updateStrengthIndicator(strength);
  });
}

// Form Validation
if (signupForm) {
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = passwordInput.value.trim();
    const confirm = confirmInput.value.trim();
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // Reset all errors
    resetValidation();
    
    // Validate inputs
    let isValid = true;
    
    if (!name) {
      showError('signupName', 'Please enter your full name');
      isValid = false;
    }
    
    if (!email) {
      showError('signupEmail', 'Please enter your email');
      isValid = false;
    } else if (!validateEmail(email)) {
      showError('signupEmail', 'Please enter a valid email');
      isValid = false;
    }
    
    if (!password) {
      showError('signupPassword', 'Please enter a password');
      isValid = false;
    } else if (password.length < 8) {
      showError('signupPassword', 'Password must be at least 8 characters');
      isValid = false;
    }
    
    if (!confirm) {
      showError('signupConfirm', 'Please confirm your password');
      isValid = false;
    } else if (password !== confirm) {
      showError('signupConfirm', 'Passwords do not match');
      isValid = false;
    }
    
    if (!agreeTerms) {
      showAlert('You must agree to the terms and conditions', 'error');
      isValid = false;
    }
    
    if (isValid) {
      showAlert('Account created successfully! Redirecting...', 'success');
      console.log('Registration data:', { name, email, password });
      
      // Simulate redirect
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 2000);
    }
  });
}

// Helper Functions
function checkPasswordStrength(password) {
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const length = password.length;
  
  let strength = 0;
  
  if (length >= 8) strength++;
  if (length >= 12) strength++;
  if (hasLower && hasUpper) strength++;
  if (hasNumber) strength++;
  if (hasSpecial) strength++;
  
  return Math.min(strength, 4);
}

function updateStrengthIndicator(strength) {
  strengthBars.forEach((bar, index) => {
    bar.style.backgroundColor = index < strength ? getStrengthColor(strength) : '#e5e7eb';
  });
  
  const strengthMessages = [
    'Very Weak',
    'Weak',
    'Moderate',
    'Strong',
    'Very Strong'
  ];
  
  strengthText.textContent = strengthMessages[strength];
  strengthText.style.color = getStrengthColor(strength);
}

function getStrengthColor(strength) {
  switch(strength) {
    case 1: return '#dc2626'; // Red
    case 2: return '#d97706'; // Amber
    case 3: return '#65a30d'; // Lime
    case 4: return '#16a34a'; // Green
    default: return '#6b7280'; // Gray
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  
  let errorElement = field.parentNode.querySelector('.error-message');
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    field.parentNode.appendChild(errorElement);
  }
  
  errorElement.textContent = message;
  errorElement.style.color = 'var(--error)';
  errorElement.style.fontSize = '0.8rem';
  errorElement.style.marginTop = '5px';
  
  field.style.borderColor = 'var(--error)';
}

function resetValidation() {
  document.querySelectorAll('.error-message').forEach(el => el.remove());
  document.querySelectorAll('.input-group input').forEach(input => {
    input.style.borderColor = 'var(--border-color)';
  });
}

function showAlert(message, type) {
  const alertBox = document.createElement('div');
  alertBox.className = `signup-alert ${type}`;
  alertBox.innerHTML = `
    <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i>
    <span>${message}</span>
  `;
  
  const formHeader = signupForm.querySelector('h2');
  if (formHeader) {
    formHeader.insertAdjacentElement('afterend', alertBox);
  } else {
    signupForm.prepend(alertBox);
  }
  
  setTimeout(() => {
    alertBox.classList.add('fade-out');
    setTimeout(() => alertBox.remove(), 300);
  }, 3000);
}

// Initialize
console.log('Signup page initialized');