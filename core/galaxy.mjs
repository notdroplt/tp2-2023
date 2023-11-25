import { Complex } from "./complex.mjs";

export class Galaxy {
    /**
     * 
     * @param {Complex} position position in the complex plane
     * @param {Complex} universeSeed universe's seed
     * @param {Number} localConvergenceAverage how much does the universe converge at this point 
     */
    constructor(position, universeSeed, localConvergenceAverage){
        this.position = position
        this.universeSeed = universeSeed
        this.localConvergenceAverage = localConvergenceAverage
        this.seed = this.position.conjugate.inverse.mul(universeSeed)
    }

    3
}