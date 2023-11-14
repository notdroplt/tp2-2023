from flask import Blueprint, render_template, request
from app.models.galaxies import GalaxyModel

app = Blueprint('galaxy_api', __name__)

from .views import *

