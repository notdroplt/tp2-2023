from app.models.galaxies import GalaxyModel
from . import app

@app.route("/exists/<int:glid>/", methods=['GET'])
def galaxy_exists(galaxy_id: int):
    galaxy = GalaxyModel.query.filter_by(id=galaxy_id).first()


    return {
        f"{galaxy_id}": galaxy.__dict__ if galaxy else None
    }
    

