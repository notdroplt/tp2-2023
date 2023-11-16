from app.extensions import db

class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    pos_x = db.Column(db.Floating)
    pos_y = db.Column(db.Floating)
    pos_z = db.Column(db)
    