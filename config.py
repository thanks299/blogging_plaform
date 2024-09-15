#!/usr/bin/env python3
import os

class Config:
    SECRET_KEY = 'secret_key_here'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///blog.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
