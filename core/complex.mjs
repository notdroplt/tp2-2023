'use strict';

/**
 * @class Complex
 * 
 * Define complex numbers in js
 */
export class Complex {

    /**
     * Generate a Complex Number
     * @param {Number} a Real Part
     * @param {Number} b Imaginary Part
     */
    constructor(a, b = 0) {
        this.real = a
        this.imag = b
    }

    /**
     * get the magnitude of a complex number
     */
    get abs() {
        return Math.sqrt(this.real * this.real + this.imag * this.imag)
    }

    /**
     * get the sign of a complex number, which is its normalization
     */
    get sign() {
        return new Complex(
            this.real / this.abs,
            this.imag / this.abs
        )
    }

    /**
     * get the conjulgate of the complex number
     */
    get conjugate() {
        return new Complex(
            this.real, -this.imag
        )
    }

    /**
     * Sum two complex numbers together
     * @param {Complex} other other number to add
     * @returns sum of both numbers
     */
    add (other) {
        if (this.infinite() && other.infinite())
            return Complex.NaN

        if (this.infinite() || other.infinite())
            return Complex.Infinity

        return new Complex(
            this.real + other.real,
            this.imag + other.imag
        )
    }

    /**
     * Subtract two numbers
     * @param {Complex} other other complex number
     * @returns subtraction of this - other
     */
    sub (other) {
        if (this.infinite() && other.infinite())
            return Complex.NaN

        if (this.infinite() || other.infinite())
            return Complex.Infinity

        return new Complex(
            this.real - other.real,
            this.imag - other.imag
        )
    }


    /**
     * multiply two numbers
     * @param {Complex} other another complex number
     * @returns Complex
     */
    mul(other) {

        if ((this.isInfinite && other.isZero) || (this.isZero && other.isInfinite))
            return Complex.NaN

        if (this.isInfinite || other.isInfinite)
            return Complex.Infinity

        if (this.imag == 0 && other.imag == 0)
            return new Complex(this.real * other.real, 0)

        return new Complex(
            this.real * other.real - this.imag * other.imag,
            this.real * other.imag + this.imag * other.real
        )
    }

    /**
     * 
     * @param {Complex} other complex divisor
     * @returns complex quotient
     */
    div(other) {
        if ((this.isZero && other.isZero ) || (this.isInfinite && other.isInfinite))
            return Complex.NaN

        if (this.isInfinite && other.isZero)
            return Complex.Infinity

        if (this.isZero && other.isInfinite)
            return Complex.Zero

        if (other.imag == 0)
            return new Complex(this.real / other.real, this.imag / other.real)

        let x, t;

        if (Math.abs(other.real) < Math.abs(other.imag)) {
            x = other.real / other.imag 
            t = other.real * x + other.imag 
            return new Complex(
                (this.real * x + this.imag) / t,
                (this.imag * x - this.real) / t,
            )
        } 

        x = other.imag / other.real
        t = other.imag * x + c 

        return new Complex(
            (this.real + this.imag * x) / t,
            (this.imag - this.real * x) / t 
        )
    }

    get sin () {
        return new Complex(
            Math.sin(this.real) * Math.cosh(this.imag),
            Math.cos(this.real) * Math.sinh(this.imag)
        )
    }

    get cos() {
        return new Complex(
            Math.cos(this.real) * Math.cosh(this.imag),
            - Math.sin(this.real) * Math.sinh(this.imag)
        )
    }

    get tan() {
        let d = Math.cos(2 * this.real) + Math.cosh(2 * this.imag)

        return new Complex(
            Math.sin(2 * this.real) / d,
            Math.sinh(2 * this.imag) / d
        )
    }

    get log() {
        return new Complex(
            Math.log(this.abs),
            Math.atan2(this.imag, this.real)
        )
    }

    get exp() {
        let ereal = Math.exp(this.real)

        return new Complex(
            ereal * Math.cos(this.imag),
            ereal * Math.sin(this.imag)
        )
    }

    get isZero() {
        return this.real == 0 && this.imag == 0
    }

    get isFinite() {
        return isFinite(this.real) && isFinite(this.imag)
    }

    get isNaN() {
        return isNaN(this.real) && this.isNaN(this.imag)
    }

    get isInfinite() {
        return !(this.isNaN || this.isFinite)
    }
    
    valueOf() {
        return this.imag === 0 ? this.real : null
    }

    toVector() {
        return [this.real, this.imag]
    }

    get clone() {
        return new Complex(this.real, this.imag)
    }

    equals(other) {
        return this.real == other.real && this.imag == other.imag
    }

    get inverse() {
        if (this.isZero) return Complex.Infinity
        if (this.isInfinite) return Complex.Zero 

        const dis = this.real * this.real + this.imag * this.imag

        return new Complex(this.real / dis, -this.imag / dis)
    }
}