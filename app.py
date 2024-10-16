#!/usr/bin/env python3

from flask import Flask, render_template, request, redirect, url_for, flash, session 
from flask import send_from_directory
import os
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from models import User, Post, db
from flask_migrate import Migrate
from flask_wtf import CSRFProtect
import itsdangerous
from flask_mail import Mail, Message  # For sending emails
from authlib.integrations.flask_client import OAuth
from config import Config
from flask_paginate import Pagination, get_page_parameter

app = Flask(__name__)
app.secret_key = '438314f3511667d3ccac2d78252411ae677851415209291f'
mail = Mail(app)

app.config.from_object('config.Config')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blogging_platform.db'
db.init_app(app)
migrate = Migrate(app, db)

csrf = CSRFProtect(app)
oauth = OAuth(app)
login_manager = LoginManager(app)


@login_manager.user_loader
def load_user(user_id):
    session = db.session()  # or however your session is defined
    return session.get(User, int(user_id))

with app.app_context():
    db.create_all()


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form.get('email')
        name = request.form.get('name')
        password = request.form.get('password')
        
        user = User.query.filter_by(email=email).first()
        if user:
            flash('Email address already exists')
            return redirect(url_for('signup'))
        
        new_user = User(email=email, name=name, password=generate_password_hash(password, method='sha256'))
        db.session.add(new_user)
        db.session.commit()
        
        return redirect(url_for('login'))
    
    return render_template('signup.html')

@app.route('/')
def index():
    page = request.args.get(get_page_parameter(), type=int, default=1)
    per_page = 9  # Number of posts per page
    offset = (page - 1) * per_page
    total = Post.query.count()
    
    posts = Post.query.order_by(Post.id.desc()).offset(offset).limit(per_page).all()
    
    pagination = Pagination(page=page, total=total, per_page=per_page, css_framework='bootstrap4')
    
    return render_template('index.html', 
                           posts=posts, 
                           page_num=page, 
                           total_pages=pagination.pages)



@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['login']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user and user.password == password:
            login_user(user)
            return redirect("/dashboard")
        else:
            # Handle invalid credentials
            return render_template('login.html', error="Invalid username or password")
    return render_template('/login.html')


@app.route('/Get-Started', methods=['GET', 'POST'], strict_slashes=False)
def GetStarted():
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
        title = request.form.get('title')
        content = request.form.get('content')
        new_post = Post(title=title, content=content, author=current_user)
        db.session.add(new_post)
        db.session.commit()
        return redirect(url_for('view_post', post_id=new_post.id))
    return render_template('post.html')
    pass


@app.route('/post/<int:post_id>/edit', methods=['GET', 'POST'], strict_slashes=False)
@login_required
def edit_post(post_id):
    post = Post.query.get_or_404(post_id)
    if post.author != current_user:
        abort(403)  # Forbidden access
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
    if post.author != current_user:
        abort(403)  # Forbidden access
    db.session.delete(post)
    db.session.commit()
    return redirect(url_for('index'))
    pass

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

@app.route('/send-reset-email', methods=['POST'])
def send_reset_email(user_email, token):
    msg = Message("Password Reset Request",
                  sender='noreply@demo.com',
                  recipients=[user_email])
    msg.body = f'''To reset your password, visit the following link:
{url_for('reset_password', token=token, _external=True)}
If you did not make this request then simply ignore this email and no changes will be made.
'''
    mail.send(msg)
    flash('Reset email sent!', 'success')
    return redirect(url_for('login'))


@app.route('/forgot_password', methods=['GET', 'POST'])
def forgot_password():
    if request.method == 'POST':
        email = request.form['email']
        user = get_user_by_email(email)  # Fetch user from your database
        
        if user:

            s = itsdangerous.URLSafeTimedSerializer(app.secret_key)
            token = s.dumps(email, salt='password-reset-salt')
            send_reset_email(email, token)
            flash('A reset link has been sent to your email.', 'success')
        else:
            flash('Email not found.', 'danger')
            return redirect(url_for('login'))
    
    return render_template('forgot-password.html')


@app.route('/blog', methods=['GET'])
def blog():
    return render_template('blog.html') 

@app.route('/contact', methods=['GET'])
def contact():
    return render_template('contact.html') 

@app.route('/about', methods=['GET'])
def about():
    return render_template('about.html') 

@app.route('/membership', methods=['GET'])
def membership():
    return render_template('membership.html')

@app.route('/back_to_login', methods=['GET'])
def back_to_login():
    return redirect(url_for('login'))

@app.route('/write', methods=['GET', 'POST'])
@login_required
def Write():
    return render_template('post.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)