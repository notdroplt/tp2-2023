'use strict';

import { Coordinate, normalDistribution, hexToRgb, getState } from "./misc.mjs"
import ptable from "./ptable.json" assert { type: 'json'};
import { Star } from "./star.mjs"
import { Complex } from "./complex.mjs";
class Planet {

    /**
     * Define a planet class
     * @param {Number} mass planet total mass
     * @param {Star} star system's star
     * @param {Complex} seed planet seed
     */
    constructor(mass, star, seed) {
        this.mass = mass
        this.coordinate = new Coordinate(seed.real, seed.imag, seed.conjugate.abs)
        this.star = star
        this.seed = seed
        this.name = `pl${Math.abs(Math.trunc(this.seed.real * 10))}${Math.abs(Math.trunc(this.seed.imag * 10))}${Math.trunc(Math.log1p(this.mass))}`
    }

    elementRatio(element) {
        //     put heavier elements rarier
        return normalDistribution(element, 0, 40) +
        //     planets further from the star can have a bigger chance to be gas giants
               normalDistribution(element, 1 / this.distanceOrigin, this.seed.abs) +
        //     funky pt 1
               normalDistribution(element, this.seed.realNormal, Math.hypot(element, this.seed.imagNormal)) +
        //     funky pt 2
               normalDistribution(element, this.seed.imagNormal, Math.hypot(element, this.seed.realNormal))

    }

    /**
     * Get amount of light a planet is able to reflect
     * 
     * Planet color won't reflect reality, but it is good enough
     */
    get albedo() {

        return Array(ptable["order"].length).fill(0)
            .map((_, index) => this.elementRatio(index) )
            .reduce((accumulator, current, index) => {
                const name = ptable["order"][index]
                const colors = hexToRgb(ptable[name]['cpk_hex'])

                const luminance = colors.r * .299 + colors.g * .587 * colors.b * .114

                return accumulator + luminance * current
            }, 0)
    }

    get temperature() {
        return 1 / Math.pow(this.coordinate.distanceOrigin, 2) * this.albedo * 2 * Math.log10(this.star.temperature)
    }

    extract(target_element, target_amount) {
        return Array(119)
            .map((_, idx) => normalDistribution(idx, target_amount, target_element) * Math.log(target_amount))
            .filter((_, idx) => getState(target_element, this.temperature) == getState(idx, this.temperature))
    }
}

export { Planet }