from .galaxies import Galaxy

class Position:
    planet: Planet | None 
    """
    Caso planeta não seja nulo, aplica um multiplicador de 10^2km para a distância atual, com a origem sendo o próprio planeta
    """

    system: System | None 
    """
    Caso o sistema não seja nulo, aplica um multiplicador de 10^9km para a distância atual, com a origem sendo a estrela do sistema
    """

    galaxy: Galaxy | None
    """
    Caso a galáxia não seja nula, aplica um multiplicador de 10^14km para a distancia atual, com a origem sendo o buraco negro central
    """

    # caso os três sejam nulos, um multiplicador de 10^25km é aplicado, e a origem é o centro do universo

    x: float 
    """
    Distância em relação ao centro relativo, eixo x
    """

    y: float
    """
    Distância em relação ao centro relativo, eixo y
    """

    z: float
    """
    Distância em relação ao centro relativo, eixo z
    """

    def __init__(self, galaxy: Galaxy | None = None, system: System | None = None, planet: Planet | None = None):
        self.galaxy = galaxy
        self.system = system
        self.planet = planet
        pass

    
