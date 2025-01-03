document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.querySelector("form");
  const usernameInput = document.querySelector('input[name="username"]');
  const emailInput = document.querySelector('input[name="email"]');
  const passwordInput = document.querySelector('input[name="password"]');
  const passwordStrengthIndicator = document.createElement("div");
  
  passwordStrengthIndicator.classList.add("password-strength-indicator");
  passwordInput.parentNode.insertBefore(passwordStrengthIndicator, passwordInput.nextSibling);

  registerForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      // Basic validation
      if (usernameInput.value.trim() === "") {
          alert("Please enter your username.");
          return;
      }
      if (emailInput.value.trim() === "") {
          alert("Please enter your email.");
          return;
      }
      if (passwordInput.value.trim() === "") {
          alert("Please enter your password.");
          return;
      }

      // Simulate a successful registration (you can replace this with an actual AJAX call)
      alert("Registration successful!");

      // Optionally, you can submit the form programmatically here
      // registerForm.submit();
  });

  // Password strength checker
  passwordInput.addEventListener("input", function () {
      const password = passwordInput.value;
      const strength = checkPasswordStrength(password);
      updatePasswordStrengthIndicator(strength);
  });

  function checkPasswordStrength(password) {
      let strength = "weak";

      // Check for strength criteria
      if (password.length >= 8) {
          if (/[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[!@#$%^&*]/.test(password)) {
              strength = "strong";
          } else if (/[A-Z]/.test(password) || /[a-z]/.test(password) || /\d/.test(password)) {
              strength = "medium";
          }
      }
      return strength;
  }

  function updatePasswordStrengthIndicator(strength) {
      passwordStrengthIndicator.textContent = `Password Strength: ${strength.charAt(0).toUpperCase() + strength.slice(1)}`;
      switch (strength) {
          case "strong":
              passwordStrengthIndicator.style.color = "#00FF00"; // Bright green
              break;
          case "medium":
              passwordStrengthIndicator.style.color = "#FFFF00"; // Bright yellow
              break;
          case "weak":
              passwordStrengthIndicator.style.color = "#FF0000"; // Bright red
              break;
      }
  }
});
