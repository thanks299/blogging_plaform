// Get the navigation links
const navLinks = document.querySelectorAll('nav ul li a');

// Add event listeners to the navigation links
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    // Highlight the active link
    navLinks.forEach((otherLink) => {
      otherLink.classList.remove('active');
    });
    link.classList.add('active');
  });
});

// Get the edit and delete post links
const editLinks = document.querySelectorAll('.content ul li p a[href*="edit"]');
const deleteForms = document.querySelectorAll('.content ul li p form');

// Confirm deletion before submitting the form
deleteForms.forEach((form) => {
  form.addEventListener('submit', (e) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      e.preventDefault();
    }
  });
});

// Optional: Add a search bar functionality
const searchBar = document.createElement('input');
searchBar.type = 'search';
searchBar.placeholder = 'Search posts...';
document.querySelector('.content').prepend(searchBar);

searchBar.addEventListener('input', (e) => {
  const searchQuery = e.target.value.toLowerCase();
  const posts = document.querySelectorAll('.content ul li');

  posts.forEach((post) => {
    const postTitle = post.querySelector('h2').textContent.toLowerCase();
    const postContent = post.querySelector('p').textContent.toLowerCase();

    if (postTitle.includes(searchQuery) || postContent.includes(searchQuery)) {
      post.style.display = 'block';
    } else {
      post.style.display = 'none';
    }
  });
});
