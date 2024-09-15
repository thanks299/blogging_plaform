// Get the form elements
const form = document.querySelector('form');
const titleInput = document.querySelector('input[name="title"]');
const contentTextarea = document.querySelector('textarea[name="content"]');

// Add event listener to the form submission
form.addEventListener('submit', (e) => {
  // Prevent default form submission behavior
  e.preventDefault();

  // Validate title and content
  if (titleInput.value.trim() === '' || contentTextarea.value.trim() === '') {
    alert('Please fill in both title and content.');
    return;
  }

  // Submit the form
  form.submit();
});

// Add event listener to the title input
titleInput.addEventListener('input', () => {
  // Check title length
  if (titleInput.value.length > 100) {
    alert('Title should not exceed 100 characters.');
    titleInput.value = titleInput.value.substring(0, 100);
  }
});

// Add event listener to the content textarea
contentTextarea.addEventListener('input', () => {
  // Check content length
  if (contentTextarea.value.length > 1000) {
    alert('Content should not exceed 1000 characters.');
    contentTextarea.value = contentTextarea.value.substring(0, 1000);
  }
});

// Auto-save feature (optional)
setInterval(() => {
  const formData = new FormData(form);
  fetch('/auto-save-post', {
    method: 'POST',
    body: formData
  })
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
}, 30000); // Auto-save every 30 seconds
