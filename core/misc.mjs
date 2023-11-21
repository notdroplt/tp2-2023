'use strict';

import { Complex } from "./complex.mjs";
import ptable from "./ptable.json" assert { type: 'json'}

class Coordinate {

    /**
     * 3d coordinate
     * @param {Number} x Coordinate x
     * @param {Number} y Coordinate y
     * @param {Number} z Coordinate z
     */
    constructor(x, y, z) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    get x() { return this._x; }
    get y() { return this._y; }
    get z() { return this._z; }

    /**
     * Get the distance between two points
     * @param {Coordinate} other other coordinate to calculate distance
     * @returns euclidian distance between two points
     */
    distance(other) {
        return Math.sqrt(
            Math.pow(this.x - other.x, 2) +
            Math.pow(this.y - other.y, 2) +
            Math.pow(this.z - other.z, 2)
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
 * Generate a linear space divided into equidistant parts
 * @param {Number} start start of the linear space
 * @param {Number} stop end of the linear space
 * @param {Number} count amount of times to divide the space into
 * @returns Array going from start -> stop
 */
function linspace(start, stop, count = 10) {
    const inc = (stop - start) / (count - 1)
    return Array(count).fill(start).forEach(
        (value, index) => value + index * inc
    )
}

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

export { Coordinate, linspace, sigmoid, ComplexRng, normalDistribution, normalDistribution_function, hexToRgb, getState }
