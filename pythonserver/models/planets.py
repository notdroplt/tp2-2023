from pythonserver.extensions import db

class Planet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    system_id = db.Column(db.Integer, db.Foreignkey('System.id'), nullable=False)
    mass = db.Column(db.Float, nullable=False)
    hydrogen_ratio = db.Column(db.Float, nullable=False)
    lithium_ratio = db.Column(db.Float, nullable=False)
    carbon_ratio = db.Column(db.Float, nullable=False)
    nitrogen_ratio = db.Column(db.Float, nullable=False)
    silicon_ratio = db.Column(db.Float, nullable=False)
    silver_ratio = db.Column(db.Float, nullable=False)
    copper_ratio = db.Column(db.Float, nullable=False)
    iron_ratio = db.Column(db.Float, nullable=False)
    gold_ratio = db.Column(db.Float, nullable=False)
    