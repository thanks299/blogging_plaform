#!/usr/bin/env python3
import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', '438314f3511667d3ccac2d78252411ae677851415209291f')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///blogging_platform.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Flask-Mail configuration
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = 'noreply@demo.com'
