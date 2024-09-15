#!/usr/bin/env python3

from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, login_required, logout_user
from models import User, Post, db
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object('config.Config')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blogging_platform.db'
db.init_app(app)
migrate = Migrate(app, db)

login_manager = LoginManager(app)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route('/')
def index():
    posts = Post.query.all()
    return render_template('index.html', posts=posts)


@app.route('/login', methods=['GET', 'POST'])
def login():
   if request.method == 'POST': # Validate user credentials and log them in
       return redirect('/dashboard')  # Redirect to another page after successful login
   return render_template('/login.html')
   pass


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Handle registration form submission
        # Create user in database
        return redirect('/login')  # Redirect after successful registration
    return render_template('/register.html')
    pass


@app.route('/post', methods=['GET', 'POST'])
@login_required
def create_post():
    if request.method == 'POST':
        # Get form data
        title = request.form.get('title')
        content = request.form.get('content')

        # Create a new post object
        new_post = Post(title=title, content=content, author=current_user)

        # Add the new post to the database
        db.session.add(new_post)
        db.session.commit()

        # Redirect to a page displaying the new post or a list of posts
        return redirect(url_for('view_post', post_id=new_post.id))
    
    # If the request method is GET, render the form template
    return render_template('post.html')
    pass


@app.route('/post/<int:post_id>/edit', methods=['GET', 'POST'])
@login_required
def edit_post(post_id):
    # post editing logic here
    pass


@app.route('/post/<int:post_id>/delete', methods=['POST'])
@login_required
def delete_post(post_id):
    # post deletion logic here
    pass


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True)
