import { Coordinate } from "./misc.mjs";

class Star {
    /**
     * 
     * @param {Number} mass star mass (in solar masses)
     * @param {Coordinate} coordinate star coordinate from the center of the galaxy
     */
    constructor(mass, coordinate) {
        this.mass = mass
        this.coordinate = coordinate

        const solarMass = 1.989 * Math.pow(10, 30); // kg
        const solarRadius = 6.96 * Math.pow(10, 8); // m
        const solarLuminosity = 3.828 * Math.pow(10, 26); // W
      
        // Calculate star properties
        const massInKg = this.mass * solarMass;
        const luminosity = Math.pow(massInKg, 3.5);
        const radius = Math.pow(luminosity / solarLuminosity, 0.5) * solarRadius;
        const temperature = Math.pow(luminosity / (4 * Math.PI * Math.pow(radius, 2) * 5.67 * Math.pow(10, -8)), 0.25);

        this.luminosity = luminosity
        this.radius = radius
        this.temperature = temperature

        let color;
        if (temperature > 30000) {
          color = "#3333ff";
        } else if (temperature > 10000) {
          color = "#cccccc";
        } else if (temperature > 7500) {
          color = "#eeee99";
        } else if (temperature > 6000) {
          color = "#f3f322";
        } else if (temperature > 5000) {
          color = "#ff7000";
        } else {
          color = "#ff0000";
        }

        this.color = color
    }

}

export {Star}