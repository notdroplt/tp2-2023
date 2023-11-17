import { Coordinate, normal_distribution_function, hexToRgb } from "./misc"
import ptable from "./ptable.json"

class Planet {

    /**
     * Define a planet class
     * @param {String} name planet name
     * @param {Number} mass planet total mass
     * @param {Array<Number>} elements_ratio ratio of element inside of the planet
     * @param {Coordinate} coordinate xyz coordinate
     * @param {Star} star system's star
     * @param {Complex} seed planet seed
     */
    constructor(name, mass, elements_ratio, coordinate, star, seed) {
        this.name = name
        this.mass = mass
        this.elements_ratio = elements_ratio
        this.coordinate = coordinate
        this.star = star
    }

    /**
     * Get amount of light a planet is able to reflect
     * 
     * Planet color won't reflect reality, but it is good enough
     */
    get albedo() {
        return this.elements_ratio
        .map((value, index) => {return {value, index}})
        .filter((v) => v.value > 0.003) // only get significant values
        .reduce((accumulator, current) => {
            const name = ptable["order"][current.index]
            const colors = hexToRgb(ptable[name]['cpk_hex'])

            const luminance = colors.r * .299 + colors.g * .587 * colors.b *.114

            return accumulator + luminance * current.value
        }, 0)
    }

    
    get temperature() {
        return 1 / this.coordinate.distance(this.star.coordinate) * this.albedo
    }


    extract(target_element) {
        
    }

}

export { Planet }