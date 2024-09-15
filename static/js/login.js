// Get the form elements
const form = document.querySelector('form');
const usernameInput = document.querySelector('input[name="username"]');
const passwordInput = document.querySelector('input[name="password"]');

// Add event listener to the form submission
form.addEventListener('submit', (e) => {
  // Prevent default form submission behavior
  e.preventDefault();

  // Validate username and password
  if (usernameInput.value.trim() === '' || passwordInput.value.trim() === '') {
    alert('Please fill in both username and password.');
    return;
  }

  // Submit the form
  form.submit();
});

// Add event listener to the username input
usernameInput.addEventListener('input', () => {
  // Check username length
  if (usernameInput.value.length > 50) {
    alert('Username should not exceed 50 characters.');
    usernameInput.value = usernameInput.value.substring(0, 50);
  }
});

// Add event listener to the password input
passwordInput.addEventListener('input', () => {
  // Check password length
  if (passwordInput.value.length > 100) {
    alert('Password should not exceed 100 characters.');
    passwordInput.value = passwordInput.value.substring(0, 100);
  }
});

// Optional: Add a password strength meter
const passwordStrengthMeter = document.createElement('div');
passwordStrengthMeter.className = 'password-strength-meter';
passwordInput.parentNode.appendChild(passwordStrengthMeter);

passwordInput.addEventListener('input', () => {
  const passwordStrength = getPasswordStrength(passwordInput.value);
  passwordStrengthMeter.textContent = passwordStrength.message;
  passwordStrengthMeter.className = `password-strength-meter ${passwordStrength.className}`;
});

function getPasswordStrength(password) {
  let strength = 0;
  const messages = [
    'Very weak',
    'Weak',
    'Medium',
    'Strong',
    'Very strong'
  ];
  const classes = [
    'weak',
    'weak',
    'medium',
    'strong',
    'strong'
  ];

  // Check password length
  if (password.length < 8) {
    return { message: messages[0], className: classes[0] };
  }

  // Check for digits
  if (/\d/.test(password)) {
    strength++;
  }

  // Check for uppercase letters
  if (/[A-Z]/.test(password)) {
    strength++;
  }

  // Check for lowercase letters
  if (/[a-z]/.test(password)) {
    strength++;
  }

  // Check for special characters
  if (/[^A-Za-z0-9]/.test(password)) {
    strength++;
  }

  return { message: messages[strength], className: classes[strength] };
}
