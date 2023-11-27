import { Complex } from "./complex.mjs";
import { Fractals } from "./fractals.mjs";

export class Universe {
    constructor() {
        this.seed = new Complex(0.412793, 0.945826)
    }

    /**
     * 
     * @param {Complex} complex the complex coordinate
     */
    convergeNear(coord) {
        Fractals.julia_divergence_range(this.seed, 170, coord, 11, 25, 6)

        
    }
}