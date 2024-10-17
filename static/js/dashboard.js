// JavaScript to handle navigation and dynamic page content
document.addEventListener('DOMContentLoaded', function() {
  const navItems = document.querySelectorAll('.nav-item');
  const mainContent = document.querySelector('main');

  navItems.forEach(item => {
      item.addEventListener('click', function(event) {
          event.preventDefault();

          // Remove active class from all nav items
          navItems.forEach(nav => nav.classList.remove('active'));

          // Add active class to the clicked item
          this.classList.add('active');

          // Update main content based on clicked item
          const page = this.getAttribute('data-page');
          updateContent(page);
      });
  });

  function updateContent(page) {
      switch (page) {
          case 'home':
              mainContent.innerHTML = '<h1>Welcome to your Dashboard</h1><p>This is your home page.</p>';
              break;
          case 'stories':
              mainContent.innerHTML = '<h1>My Stories</h1><p>Here are your stories.</p>';
              break;
          case 'reading-list':
              mainContent.innerHTML = '<h1>Reading List</h1><p>Here is your reading list.</p>';
              break;
          case 'bookmarks':
              mainContent.innerHTML = '<h1>Bookmarks</h1><p>Here are your bookmarks.</p>';
              break;
          case 'settings':
              mainContent.innerHTML = '<h1>Settings</h1><p>Manage your settings here.</p>';
              break;
          case 'help':
              mainContent.innerHTML = '<h1>Help</h1><p>How can we assist you?</p>';
              break;
          case 'sign-out':
              mainContent.innerHTML = '<h1>Sign Out</h1><p>You have signed out.</p>';
              break;
          default:
              mainContent.innerHTML = '<h1>Welcome to your Dashboard</h1><p>Select an item from the sidebar.</p>';
              break;
      }
  }
});
