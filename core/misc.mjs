'use strict';

import { Complex } from "./complex.mjs";
import ptable from "./ptable.json" assert { type: 'json'}

class Coordinate {

    /**
     * 3d coordinate
     * @param {Number} real real part
     * @param {Number} imag imaginary part
     * @param {Number} perp perpendicular part 
     */
    constructor(real, imag, perp) {
        this._real = real;
        this._imag = imag;
        this._perp = perp;
    }

    get real() { return this._real; }
    get imag() { return this._imag; }
    get perp() { return this._perp; }

    /**
     * Get the distance between two points
     * @param {Coordinate} other other coordinate to calculate distance
     * @returns euclidian distance between two points
     */
    distance(other) {
        return Math.sqrt(
            Math.pow(this.x - other.real, 2) +
            Math.pow(this.y - other.imag, 2) +
            Math.pow(this.z - other.perp, 2)
        );
    }

    get distanceOrigin() {
        return Math.sqrt(
            Math.pow(this.x, 2) +
            Math.pow(this.y, 2) +
            Math.pow(this.z, 2)
        );
    }
}

class ComplexRng {
    /**
     * 
     * @param {Complex} seed complex number seed
     */
    constructor(seed) {
        this.seed = seed || { real: 0, imag: 0 };
    }

    next() {

        // Use properties of the complex number as seed values
        const realPart = (this.seed.real * 9301 + 49297) % 233280;
        const imagPart = (this.seed.imag * 49297 + 233280) % 9301;

        // Update the seed for the next iteration
        this.seed.real = realPart / 233280;
        this.seed.imag = imagPart / 9301;

        // Return a pseudo-random number between 0 and 1
        return (this.seed.real + this.seed.imag) % 1;
    }
}


/**
 * Calculate sigm(x)
 * @param {Number} x a real value
 */
function sigmoid(x) { Math.exp(x) / (1 + Math.exp(x)) }


/**
 * Calculates a normal distribution of x given µ and σ 
 * @param {Number} x input x value
 * @param {Number} sigma expected value
 * @param {Number} mu standard deviation
 * @returns normalized distribution value
 */
function normalDistribution(x, sigma, mu) {
    return Math.exp(-.5 * Math.pow((x - mu) / sigma, 2)) / (sigma * Math.sqrt(2 * Math.PI))
}

/**
 * Calculates a normal distribution of x given µ and σ 
 * @param {Number} sigma expected value
 * @param {Number} mu standard deviation
 * @returns closure to calculate N(x)
 */
function normalDistribution_function(sigma, mu) {
    return (x) => {
        return Math.exp(-.5 * Math.pow((x - mu) / sigma, 2)) / (sigma * Math.sqrt(2 * Math.PI))
    }
}

/**
 * transform a hex value into an rgb triplet
 * @param {String | undefined} hex hex string
 * @returns rgb representtion
 */
function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    if (hex == undefined)
        hex = "#000000"
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function getState(element_index, temperature) {
    const name = ptable['order'][element_index]
    if (ptable[name].boil < temperature) return 'gas'
    if (ptable[name].melt > temperature) return 'solid'
    return 'liquid';    
}

export { Coordinate, sigmoid, ComplexRng, normalDistribution, normalDistribution_function, hexToRgb, getState }
