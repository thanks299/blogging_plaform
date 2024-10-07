#!/usr/bin/env python3

from flask import Flask, render_template, request, redirect, url_for, flash
from flask import send_from_directory
import os
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from models import User, Post, db
from flask_migrate import Migrate
from flask_wtf import CSRFProtect
import itsdangerous
from flask_mail import Mail, Message  # For sending emails

app = Flask(__name__)
app.secret_key = '438314f3511667d3ccac2d78252411ae677851415209291f'
mail = Mail(app)

app = Flask(__name__)
app.config.from_object('config.Config')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blogging_platform.db'
db.init_app(app)
migrate = Migrate(app, db)
csrf = CSRFProtect(app)

login_manager = LoginManager(app)


@login_manager.user_loader
def load_user(user_id):
    session = db.session()  # or however your session is defined
    return session.get(User, int(user_id))


@app.route('/', strict_slashes=False)
def index():
    posts = Post.query.all()
    return render_template('index.html', posts=posts)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user and user.password == password:
            login_user(user)
            return redirect("/dashboard")
    return render_template('/login.html')


@app.route('/register', methods=['GET', 'POST'], strict_slashes=False)
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        user = User(username=username, email=email, password=password)
        db.session.add(user)
        db.session.commit()
        return redirect(url_for('login'))
    return render_template('register.html')


@app.route('/post', methods=['GET', 'POST'], strict_slashes=False)
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


@app.route('/post/<int:post_id>/edit', methods=['GET', 'POST'], strict_slashes=False)
@login_required
def edit_post(post_id):
    post = Post.query.get_or_404(post_id)
    if request.method == 'POST':
        post.title = request.form['title']
        post.content = request.form['content']
        db.session.commit()
        return redirect(url_for('view_post', post_id=post.id))
    return render_template('edit_post.html', post=post)  # For GET request, return a template
    pass


@app.route('/post/<int:post_id>/delete', methods=['POST'], strict_slashes=False)
@login_required
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    return redirect(url_for('index'))  # Ensure it redirects after deletion
    pass


# ! this is the dashbord route continue your implemetation
@app.route('/dashboard', methods=['GET'], strict_slashes=False)
@login_required
def dashboard():
    return render_template("dashboard.html")


@app.route('/logout', strict_slashes=False)
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))


@app.route('/post/<int:post_id>', strict_slashes=False)
def view_post(post_id):
    # Logic to fetch and display the post
    post = Post.query.get_or_404(post_id)
    return render_template('view_post.html', post=post)


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
            'favicon.ico', mimetype='image/vnd.microsoft.icon')

def send_reset_email(user_email, token):
    msg = Message("Password Reset Request",
                  sender='noreply@demo.com',
                  recipients=[user_email])
    msg.body = f'''To reset your password, visit the following link:
{url_for('reset_password', token=token, _external=True)}
If you did not make this request then simply ignore this email and no changes will be made.
'''
    mail.send(msg)

@app.route('/forgot-password', methods=['GET', 'POST'])
def forgot_password():
    if request.method == 'POST':
        email = request.form['email']
        user = get_user_by_email(email)  # type: ignore # Fetch user from your database

        if user:
            # Create a token
            s = itsdangerous.URLSafeTimedSerializer(app.secret_key)
            token = s.dumps(email, salt='password-reset-salt')
            send_reset_email(email, token)
            flash('A reset link has been sent to your email.', 'success')
        else:
            flash('Email not found.', 'danger')
        return redirect(url_for('login'))  # Redirect to login or another page
    return render_template('forgot-password.html')


if __name__ == '__main__':
    app.run(debug=True)
