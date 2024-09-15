// Get the form elements
const form = document.querySelector('form');
const titleInput = document.querySelector('#title');
const contentTextarea = document.querySelector('#content');

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
  if (contentTextarea.value.length > 1,000,000) {
    alert('Content should not exceed 1000 characters.');
    contentTextarea.value = contentTextarea.value.substring(0, 1,000,000);
  }
});

// Optional: Add a character counter
const titleCounter = document.createElement('p');
titleCounter.textContent = `Title characters: 0/100`;
titleInput.parentNode.appendChild(titleCounter);

titleInput.addEventListener('input', () => {
  titleCounter.textContent = `Title characters: ${titleInput.value.length}/100`;
});

const contentCounter = document.createElement('p');
contentCounter.textContent = `Content characters: 0/1000`;
contentTextarea.parentNode.appendChild(contentCounter);

contentTextarea.addEventListener('input', () => {
  contentCounter.textContent = `Content characters: ${contentTextarea.value.length}/1000`;
});
