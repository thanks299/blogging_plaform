document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector("form");
  const loginInput = document.querySelector('input[name="login"]');
  const passwordInput = document.querySelector('input[name="password"]');
  const passwordStrengthIndicator = document.createElement("div");
  
  passwordStrengthIndicator.classList.add("password-strength-indicator");
  passwordInput.parentNode.insertBefore(passwordStrengthIndicator, passwordInput.nextSibling);

  loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      // Basic validation (you can add more complex checks if needed)
      if (loginInput.value.trim() === "") {
          alert("Please enter your username or email.");
          return;
      }
      if (passwordInput.value.trim() === "") {
          alert("Please enter your password.");
          return;
      }

      // Simulate a successful login (you can replace this with an actual AJAX call)
      alert("Login successful!");

      // Optionally, you can submit the form programmatically here
      // loginForm.submit();
  });

  // Optional: Add focus effect on inputs
  loginInput.addEventListener("focus", function () {
      loginInput.classList.add("input-focused");
  });

  loginInput.addEventListener("blur", function () {
      if (loginInput.value.trim() === "") {
          loginInput.classList.remove("input-focused");
      }
  });

  passwordInput.addEventListener("focus", function () {
      passwordInput.classList.add("input-focused");
  });

  passwordInput.addEventListener("blur", function () {
      if (passwordInput.value.trim() === "") {
          passwordInput.classList.remove("input-focused");
      }
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
