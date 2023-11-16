import math
from .fractals import Fractals
from .galaxies import Galaxy
import numpy as np

class Universe:
    """
    Classe responsável por gerir disposição e acúmulo de galáxias dentro do jogo
    """

    _julia_position: complex = -0.4127 + 0.95j 
    """
    Número de Julia para a posição das galáxias
    """

    _julia_height_map: complex = 0.3424 - 0.43j
    """
    Número de Julia para a altura de cada galáxia
    """

    _divergence: int = 170 
    """
    Iterações até um número ser considerado "não divergente"
    """

    _divergence_threshold: int = 4.12452
    """
    Número mínimo para gerar uma galáxia
    """

    _closest_next_distance = 0.1
    """
    Menor multiplicador de distância entre quaisquer dois pontos no universo
    """

    _blur_intensity = 17
    """
    Intensidade de névoa universal
    """

    @staticmethod
    def get_galaxy_proximal_intensity_at(position: complex): 
        proximal_intensities = Fractals.julia_divergence_range(Universe._julia_position, Universe._divergence, complex(position[0], position[1]), Universe._closest_next_distance, 17, exponent=6)

        averaged_out = np.exp(proximal_intensities / np.mean(proximal_intensities)) / math.pow(math.e, Universe._closest_next_distance**5)

        gradient_x = [np.concatenate((np.arange(-4, 4), np.arange(4, -5, -1)))]

        gradient = np.exp(gradient_x * np.copy(gradient_x).T / Universe._blur_intensity)

        return averaged_out * gradient

    @staticmethod
    def get_galaxy_intensity_at(position: complex) -> float:
        if Fractals.julia_closed(position, Universe._divergence, 6):
            return 0.0
        return np.mean(Universe.get_galaxy_proximal_intensity_at(position))
        
        
    @staticmethod
    def generate_galaxy_at(position: complex) -> Galaxy | None:
        prox_int = Universe.get_galaxy_proximal_intensity_at(position)
        if (np.mean(prox_int) < Universe._divergence_threshold):
            return None 
        
        calculated_mass = np.median(prox_int)
        return Galaxy(position, calculated_mass, Universe._julia_height_map)
    


Universe.get_galaxy_intensity_at((0, 0, 3))