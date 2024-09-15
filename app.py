#!/usr/bin/env python3

from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
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
    # post editing logic here
    pass


@app.route('/post/<int:post_id>/delete', methods=['POST'], strict_slashes=False)
@login_required
def delete_post(post_id):
    # post deletion logic here
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


if __name__ == '__main__':
    app.run(debug=True)
