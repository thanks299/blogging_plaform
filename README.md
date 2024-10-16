---

# TREEFREE

The **TREEFREE** is a robust web application designed to allow users to create, edit, and manage blog posts. It supports user authentication, dynamic content management, and various interactive features for users to explore and engage with blog posts. This project also includes an admin panel for managing users and posts, as well as support for premium membership functionality.

## Table of Contents
- [Overview](#overview)
- [Team Roles](#team-roles)
- [Features](#features)
- [APIs](#apis)
- [Data Modeling](#data-modeling)
- [User Stories](#user-stories)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview
This **Blogging Platform** enables users to sign up, log in, write blog posts, and manage their personal blogs. It includes a user-friendly frontend built with HTML/CSS and JavaScript, while the backend uses Flask with SQLAlchemy to manage the server-side logic and database interactions. The platform also supports different user roles like admins, allowing them to manage users and posts.

## Team Roles

**Abubakr Parvez - Backend Developer**
- Responsible for backend development, API design, and deployment.

**Shuaib Mohammed - Backend Developer**
- Responsible too for backend development, API design, and deployment.

**Agbeble Thanks - Full-Stack Developer**
- Manages UI/UX design, frontend implementation using JavaScript, HTML, and CSS.Contributes to both backend and frontend development, ensuring smooth interaction between the client and server-side functionalities.

## Features

### Core Features
- **User Authentication**: Users can register, log in, and log out using secure authentication (Flask-Login and JWT).
- **Post Management**: Create, edit, delete, and view blog posts.
- **Comments System**: (Future feature) Users will be able to comment on blog posts.
- **Search Functionality**: Search for posts using keywords.
- **User Profiles**: Each user has a profile displaying their posts.
- **Admin Panel**: Admin users can manage posts and users.
- **Membership Plans**: Supports free and premium memberships.

### Frontend
- **HTML5, CSS3, JavaScript**: Ensures a responsive and engaging interface for users.
- **Bootstrap**: Responsive design framework used for styling and layout management.

### Backend
- **Flask**: Python web framework for server-side logic.
- **Flask-SQLAlchemy**: ORM for managing database operations.
- **Flask-Login**: For user session management.
- **JWT Authentication**: Secure token-based authentication for API routes.
- **Flask-WTF**: For form handling and validation.
- **Flask-Mail**: For sending emails like password reset notifications.

---

## APIs

### User Authentication and Profile Management
- **Login:** `POST /api/auth/login` - Authenticates and returns a session token.
- **Register:** `POST /api/auth/register` - Registers a new user and returns a session token.
- **Profile Management:**
  - `GET /api/user/profile` - Retrieves profile information.
  - `PUT /api/user/profile` - Updates profile information.

### Post Management
- **Create Post:** `POST /api/post` - Creates a new blog post.
- **Edit Post:** `PUT /api/post/<post_id>` - Edits an existing post.
- **Delete Post:** `DELETE /api/post/<post_id>` - Deletes a specific post.
- **View Posts:** `GET /api/posts` - Retrieves all blog posts.
  
### Search and Filtering
- **Search Posts:** `GET /api/search` - Searches posts based on a query string.

### Membership and User Roles
- **Upgrade to Premium:** `POST /api/membership/upgrade` - Upgrades user membership to premium.
- **Role Management:** `POST /api/admin/role` - Manages user roles (Admin only).

---

## Data Modeling

### Users
- `user_id (PK)`
- `username`
- `email`
- `password_hash`
- `is_admin`
- `is_premium`
- `created_at`
- `updated_at`

### Posts
- `post_id (PK)`
- `title`
- `content`
- `author_id (FK)`
- `created_at`
- `updated_at`

### Comments (Future Feature)
- `comment_id (PK)`
- `post_id (FK)`
- `user_id (FK)`
- `content`
- `created_at`

### Memberships
- `membership_id (PK)`
- `user_id (FK)`
- `membership_type` (Free, Premium)
- `created_at`

---

## User Stories

### User Authentication and Profile Management
- **Story:** As a user, I want to create an account, log in, and access my personal profile to manage my blog posts.
- **Acceptance Criteria:** User registration, login, profile view, and profile updates are functional.

### Post Management
- **Story:** As a blogger, I want to create new blog posts, edit existing posts, and delete posts that I no longer want to display.
- **Acceptance Criteria:** Users can create, edit, delete, and view posts.

### Search and Filtering
- **Story:** As a reader, I want to search for blog posts by keywords, so I can easily find content I’m interested in.
- **Acceptance Criteria:** Implement search functionality that filters blog posts by title or content.

### Premium Membership
- **Story:** As a user, I want to upgrade to a premium membership to unlock additional features like exclusive content and faster response times.
- **Acceptance Criteria:** Users can upgrade their membership status and access premium features.

---

## Setup and Installation

### Prerequisites
- **Python 3.x**
- **Node.js 14.x** (for frontend)
- **SQLite** (for local database) or **PostgreSQL** (for production)
- **Flask** and required Python packages

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/thanks299/blogging_plaform.git
   cd blogging_plaform
   ```

2. **Create and Activate a Virtual Environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Database Setup**
   Create an SQLite database (or PostgreSQL for production) and apply migrations:
   ```bash
   flask db upgrade
   ```

5. **Run the Application**
   Start the Flask development server:
   ```bash
   flask run
   ```

   The app will be accessible at `http://127.0.0.1:5000`.

---

## Usage

### Running the Application

1. **Start Backend**  
   In the terminal, run:
   ```bash
   flask run
   ```

2. **Access the Platform**  
   Open your browser and navigate to `http://localhost:5000` to access the platform.

### API Endpoints
- **User Authentication:**
  - `POST /api/auth/login`
  - `POST /api/auth/register`
- **Profile Management:**
  - `GET /api/user/profile`
  - `PUT /api/user/profile`
- **Post Management:**
  - `GET /api/posts`
  - `POST /api/post`
  - `PUT /api/post/<id>`
  - `DELETE /api/post/<id>`

---

## Contributing

We welcome contributions to the **Blogging Platform** project! To contribute:

1. **Fork the repository**.
2. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes** and push the branch to your fork:
   ```bash
   git commit -m 'Add new feature'
   git push origin feature/your-feature-name
   ```
4. **Submit a pull request** with a description of your changes.

### Issues
If you encounter any bugs or have feature requests, please [open an issue](https://github.com/thanks299/blogging_plaform/issues).

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

This detailed `README.md` serves as a comprehensive guide for developers and contributors, covering setup, usage, API documentation, and more.
