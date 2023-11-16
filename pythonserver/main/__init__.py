from flask import Blueprint, render_template

bp = Blueprint('main', __name__)

from app.main import routes