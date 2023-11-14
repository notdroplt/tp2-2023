import numpy as np


class Fractals:    
    @staticmethod
    def mandelbrot_divergence(start: complex, divergence_count: int, exponent: float = 2) -> int:
        """
        Calculate the divergence in a given R² coordinate on the mandelbrot set
        """
        c = z = start
        for i in range(divergence_count):
            if abs(z) > 2:
                return i
            z = np.power(z, exponent) + c
        return divergence_count

    @staticmethod
    def julia_divergence_range(constant: complex, divergence_count, coordinate: complex = 0+0j, step: float = 1.4, size:int = 11, exponent: float = 2):
        """
        Calculate the divergence in a given R² coordinate and adjacents on a julia set
        """
        y, x = np.ogrid[
            coordinate.real-step : coordinate.real+step: size*1j,
            coordinate.imag-step : coordinate.imag+step: size*1j,
        ]

        z_array: np.ndarray[np.complex128] = x + y*1j


        iterations_until_divergence: np.ndarray[np.floating] = np.full(z_array.shape, divergence_count)

        not_already_diverged = np.full(z_array.shape, True) 

        diverged_in_past = np.full(z_array.shape, False) 
        
        for i in range(divergence_count):
            z_array = np.where(not_already_diverged, np.power(z_array, exponent) + constant, z_array)
                
            z_size_array = z_array * np.conj(z_array)
            diverging = z_size_array > 4
            
            diverging_now = diverging & not_already_diverged
            iterations_until_divergence[diverging_now] = i
            
            not_already_diverged &= ~diverging_now 
            diverged_in_past |= diverging_now
            z_array[diverged_in_past] = 0

        

        return iterations_until_divergence

    @staticmethod
    def julia_set(height: float, width: float, max_iterations: int, start: complex) -> np.ndarray[np.floating]:
        y, x = np.ogrid[1.4: -1.4: height*1j, -1.4: 1.4: width*1j]

        z_array: np.ndarray[np.complex128] = x + y*1j

        iterations_until_divergence: np.ndarray[np.floating] = np.full(z_array.shape, float(max_iterations))

        not_already_diverged = np.full(z_array.shape, True) 

        diverged_in_past = np.full(z_array.shape, False) 
        
        for i in range(max_iterations):
            z_array = np.where(not_already_diverged, z_array**2 + start, z_array)
                
            z_size_array = z_array * np.conj(z_array)
            diverging = z_size_array > 4
            
            diverging_now = diverging & not_already_diverged
            iterations_until_divergence[diverging_now] = i
            

            not_already_diverged &= ~diverging_now 
            diverged_in_past |= diverging_now
            z_array[diverged_in_past] = 0
            
        return iterations_until_divergence

    @staticmethod
    def julia_closed(start: complex, divergence: int, exponent: int) -> bool:
        center = Fractals.julia_divergence_range(start, divergence, step=0.15, exponent=exponent)
        average = np.median(center / np.median(center))

        return average >= divergence - 2 and np.min(center) >= divergence - 5

