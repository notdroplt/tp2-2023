from .fractals import Fractals

class Galaxy:
    coord: complex
    """
    Posição da galáxia em relação ao centro da simulação, valor multiplicado por 10^25. eixo x-y
    """

    z: float
    """
    Posição da galáxia em relação ao centro da simulação, valor multiplicado por 10^25. eixo z
    """

    julia_number: complex 
    """
    numero de julia utilizado para a formação da galáxia
    """

    exponent: int 
    """
    expoente para a formação da galáxia
    """

    def __init__(self, coord: complex, mass: float, height: complex):
        self.coord = coord 
        self.mass = mass 


    def distance(self, other: 'Galaxy') -> float:
