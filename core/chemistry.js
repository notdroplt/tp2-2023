class ElectronShell {
    /**
     * construct a single shell
     * 
     * @param {Number} layer primary layer
     * @param {String} sublayer secondary layer 
     * @param {Number} amount amount on that layer
     */
    constructor(layer, sublayer, amount) {
        this.layer = layer;
        this.sublayer = sublayer 
        this.amount = amount
    }

    /**
     * 
     * @param {String} string electron shell configuration
     * @returns a shell class
     */
    static fromString(string) {
        const res = /(\d)([spdf])(\d{1,2})/g.exec(string)
        return new ElectronShell(+res[1], res[2], +res[3])
    }

    get repr () {
        return `${layer}${this.sublayer}${this.amount}`
    }
}

class Eletrosphere {
    /**
     * Construct an electrosphere
     * @param {Array<ElectronShell>} shells eletronic shells
     */
    constructor(shells) {
        this.shells = shells
    }

    get valenceShells() {
        const highest = this.shells.reduce((maxLayer, shell) => Math.max(maxLayer, shell.layer), 0);

        return this.shells.filter(el => el.layer === highest)
    }

    get valenceElectrons() {
        return this.valenceShells.reduce((acc, el) => acc + el.amount, 0)
    }

    get electrons() {
        return this.shells.reduce((acc, curr) => {
            console.log({acc, curr})
            if (curr.layer in acc)
                acc[curr.layer] += curr.amount
            else 
                acc[curr.layer] = curr.amount
            return acc 
        }, {})
    }

    get repr() {
        return this.shells.reduce((acc, el) =>  acc + ' ' + el.repr, '') 
    }

    /**
     * Generate electron configuration from string
     * @param {String} string electron configuration string
     * 
     * @returns full electron configuration
     */
    static fromString(string) {
        return new Eletrosphere(string.split(' ').map(v => ElectronShell.fromString(v)))
    }
}


class Atom {
    constructor(name, atomic_mass, boil, category, density, melt, molar_heat, number, group, period, symbol, shells, electron_configuration, electron_affinity, color) {
        this.name = name
        this.atomic_mass = atomic_mass
        this.boil = boil
        this.category = category
        this.density = density
        this.melt = melt
        this.molar_heat = molar_heat
        this.number = number
        this.group = group
        this.period = period
        this.symbol = symbol
        this.shells = shells
        this.electron_configuration = electron_configuration
        this.electron_affinity = electron_affinity
        this.color = color
    }
}