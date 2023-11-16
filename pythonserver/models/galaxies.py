from app.extensions import db

class GalaxyModel(db.Model):
    """
    identificador da galáxia
    """
    id = db.Column(db.BigInteger, primary_key=True)

    """
    parte real da constante de Julia da galáxia
    """
    julias_real_part = db.Column(db.Float)

    """
    parte complexa da constante de Julia da galáxia
    """
    julias_imaginary_part = db.Column(db.Float)
    
    """
    índice convergencial para uma galáxia, normalmente 70
    """
    convergence_counter = db.Column(db.Integer)
    
    """
    gatilho para a formação de sistemas dentro de uma galáxia
    """
    system_formation = db.Column(db.Integer)

    """
    Massa da galáxia, em 10^6kg

    a Massa da galaxia é dada por

    (massa total)*bn% + (massa total)*hihe% + (massa total)*(1-hihe)%

    """
    mass = db.Column(db.Float)

    """
    porcentagem da massa geral consumida pelo buraco negro
    """
    blackhole_ratio = db.Column(db.Float)
    
    """
    razão hidrogênio + hélio / outros elementos na galáxia
    """
    hyrogen_helium_ratio = db.Column(db.Float)


    """
    distância em  Megaparsec do "centro" do universo, dimensão x
    """
    x_origin = db.Column(db.Float)

    """
    distância em Megaparsec do "centro" do universo, dimensão y
    """
    y_origin = db.Column(db.Float)
    
    """
    distância em Megaparsec do "centro do universo, dimensão z
    """
    z_origin = db.Column(db.Float)

    def __repr__(self) -> str:
        return f"<{self.name}: z₀ = {self.julias_real_part}{'+' if self.julias_imaginary_part > 0 else ''}{self.julias_imaginary_part}j, converging at {self.convergence_counter}>"
    