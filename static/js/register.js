// Get the form elements
const form = document.querySelector('form');
const usernameInput = document.querySelector('input[name="username"]');
const emailInput = document.querySelector('input[name="email"]');
const passwordInput = document.querySelector('input[name="password"]');

// Add event listener to the form submission
form.addEventListener('submit', (e) => {
  // Prevent default form submission behavior
  e.preventDefault();

  // Validate username
  if (usernameInput.value.trim() === '') {
    alert('Please enter a username.');
    return;
  }

  // Validate email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(emailInput.value)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Validate password
  if (passwordInput.value.length < 8) {
    alert('Password should be at least 8 characters long.');
    return;
  }

  // Submit the form
  form.submit();
});

// Add event listener to the password input
passwordInput.addEventListener('input', () => {
  // Check password strength
  const passwordStrength = getPasswordStrength(passwordInput.value);
  const passwordStrengthElement = document.createElement('div');
  passwordStrengthElement.textContent = passwordStrength.message;
  passwordStrengthElement.className = passwordStrength.className;
  passwordInput.parentNode.appendChild(passwordStrengthElement);
});

// Password strength function
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
