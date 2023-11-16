from flask import Blueprint, render_template, request


app = Blueprint('planet_api', __name__)

@app.route("/exists/<int:plid>/", methods=['GET'])
def planet_exists(planet_id: int):
    pass
    