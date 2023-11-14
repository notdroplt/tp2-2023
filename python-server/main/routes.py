from app.main import bp
from flask import url_for, render_template

@bp.route('/')
def index():
    return render_template("base.html")
