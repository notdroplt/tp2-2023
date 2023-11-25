'use strict';

import { linspace, apply2d, map2d } from "./matrix.mjs";
import { Complex } from './complex.mjs';

export class Fractals {
    /**
     * Calculates how much a complex number diverges in a mandelbrot sequence
     * @param {Complex} start start position
     * @param {Number} convergence_count amount of times until convergence
     * 
     * @returns {Number} iterations until divergence (or convergence) 
     */
    static mandelbrot_convergence(start, convergence_count) {
        let c = start;
        let z = start;
        for (let i = 0; i < convergence_count; i++) {
            if (z.abs() > 2)
                return i

            z = z.pow(z, 2) + c            
        }
        return convergence_count
    }

    /**
     * Generate a matrix of size x size of convergence values on a julia set
     * 
     * @param {Complex} constant Julia start number
     * @param {Number} convergence_count max iterations to assume convergence
     * @param {Complex} coordinate Coordinate on C plane
     * @param {Number} step amount to step between each component
     * @param {Number} size how much to check range
     * @param {Number} exponent Julia exponent
     */
    static julia_divergence_range(constant, convergence_count, coordinate = Complex("0+0j"), step = 1.4, size = 11, exponent = 2) {
        const xl = linspace(coordinate.real - step, coordinate.real + step, size)
        const yl = linspace(coordinate.imag - step, coordinate.imag + step, size)
        const mat = apply2d(new Complex, xl, yl)

        return map2d(v => {
            let z = new Complex(0, 0)
            for (let i = 0; i < convergence_count; ++i) {
                z = z.pow(new Complex(exponent)).add(constant)
                if (z.abs > convergence_count)
                    return i                
            }
            return convergence_count
        }, mat)
    }
}