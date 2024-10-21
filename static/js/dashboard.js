document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const mainContent = document.getElementById('content');

    // Injecting inline CSS
    const style = document.createElement('style');
    style.textContent = `
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        .write-post-btn {
            background-color: #6200ea;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            margin-bottom: 20px;
        }

        .write-post-btn:hover {
            background-color: #3700b3;
        }

        .stories-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .post-form {
            border: 1px solid #ddd;
            padding: 20px;
            background-color: #f9f9f9;
            margin-top: 20px;
        }

        .post-form label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }

        .post-form input[type="text"],
        .post-form textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }

        .form-actions {
            display: flex;
            gap: 10px;
        }

        .form-actions button {
            padding: 10px 15px;
            font-size: 14px;
            cursor: pointer;
            border: none;
            border-radius: 5px;
        }

        .form-actions button[type="submit"] {
            background-color: #6200ea;
            color: white;
        }

        .form-actions button:hover {
            opacity: 0.9;
        }

        .hidden {
            display: none;
        }

        .preview-section {
            border-top: 2px solid #ddd;
            padding-top: 20px;
            margin-top: 20px;
        }

        .preview-section h2 {
            margin-bottom: 10px;
            font-size: 20px;
        }

        .preview-section #previewContent {
            background-color: #f1f1f1;
            padding: 15px;
            border-radius: 5px;
        }
    `;
    document.head.appendChild(style);

    navItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();

            // Remove 'active' class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));

            // Add 'active' class to the clicked nav item
            item.classList.add('active');

            // Get the data-page attribute to identify the page
            const page = item.getAttribute('data-page');
            loadPage(page);
        });
    });

    function loadPage(page) {
        let content;

        switch (page) {
            case 'home':
                content = `<h1>Home</h1><p>This is the home page content.</p>`;
                break;
            case 'stories':
                content = `
                <div class="stories-header">
                    <h1>My Stories</h1>
                    <button id="writePostBtn" class="write-post-btn">Write Your First Post</button>
                </div>
                <div id="storiesContent">
                    <p>You haven't written any stories yet. Click the button above to get started!</p>
                </div>
                <!-- Hidden form initially -->
                <div id="postForm" class="post-form hidden">
                    <h2>Create Your Story</h2>
                    <form id="storyForm">
                        <label for="title">Title:</label>
                        <input type="text" id="title" name="title" required placeholder="Enter your story title" />
                        
                        <label for="content">Content:</label>
                        <textarea id="content" name="content" rows="8" required placeholder="Write your story here..."></textarea>
                        
                        <div class="form-actions">
                            <button type="button" id="previewPostBtn">Preview</button>
                            <button type="submit">Publish</button>
                            <button type="button" id="saveDraftBtn">Save as Draft</button>
                            <button type="button" id="cancelPostBtn">Cancel</button>
                        </div>
                    </form>
                </div>
                <div id="previewSection" class="preview-section hidden">
                    <h2>Story Preview</h2>
                    <div id="previewContent"></div>
                    <button type="button" id="editPostBtn">Edit</button>
                </div>
                `;
                break;
            case 'reading-list':
                content = `<h1>Reading List</h1><p>Your reading list is displayed here.</p>`;
                break;
            case 'bookmarks':
                content = `<h1>Bookmarks</h1><p>These are your bookmarks.</p>`;
                break;
            case 'settings':
                content = `<h1>Settings</h1><p>Manage your settings here.</p>`;
                break;
            case 'help':
                content = `<h1>Help</h1><p>Get help here.</p>`;
                break;
            case 'sign-out':
                content = `<h1>Logging Out...</h1>`;
                // Add actual logout logic here
                break;
            default:
                content = `<h1>Welcome to your Dashboard</h1><p>Select an item from the sidebar to view different pages.</p>`;
        }

        // Load content into the main content area
        mainContent.innerHTML = content;

        // Add interactivity for "Write Your First Post" button
        if (page === 'stories') {
            const writePostBtn = document.getElementById('writePostBtn');
            const postForm = document.getElementById('postForm');
            const previewSection = document.getElementById('previewSection');
            const previewContent = document.getElementById('previewContent');

            writePostBtn.addEventListener('click', function () {
                postForm.classList.remove('hidden');
            });

            const cancelPostBtn = document.getElementById('cancelPostBtn');
            cancelPostBtn.addEventListener('click', function () {
                postForm.classList.add('hidden');
                previewSection.classList.add('hidden');
            });

            // Handle form submission (you can later integrate this with a backend)
            const storyForm = document.getElementById('storyForm');
            storyForm.addEventListener('submit', function (event) {
                event.preventDefault(); // Prevent page reload on form submission
                const title = document.getElementById('title').value;
                const content = document.getElementById('content').value;

                // Simulate story submission (this is where you'd send data to your backend)
                alert(`Story Published: ${title}`);

                postForm.classList.add('hidden');
                // You can also update the UI with the newly published story here
            });

            // Handle post preview
            const previewPostBtn = document.getElementById('previewPostBtn');
            previewPostBtn.addEventListener('click', function () {
                const title = document.getElementById('title').value;
                const content = document.getElementById('content').value;

                if (title && content) {
                    previewContent.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
                    previewSection.classList.remove('hidden');
                    postForm.classList.add('hidden');
                } else {
                    alert('Please fill in both the title and content!');
                }
            });

            const editPostBtn = document.getElementById('editPostBtn');
            editPostBtn.addEventListener('click', function () {
                previewSection.classList.add('hidden');
                postForm.classList.remove('hidden');
            });
        }
    }
});

console.log('Dashboard JS loaded');