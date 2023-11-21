import { DataTypes, Sequelize } from "sequelize";

/**
 * generate database models
 * @param {Sequelize} conn database connection
 */
export function generate_models(conn) {
    const User = conn.define('User', {
        username: {
            type: DataTypes.CHAR(30),
            allowNull: false
        },

        password: {
            type: DataTypes.CHAR(44),
            allowNull: false
        },

        inSystem: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        inGalaxy: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        inUniverse: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        coordx: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0.0
        },

        coordy: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0.0
        },

        coordz: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0.0
        },
    })


    const Inventory = conn.define('Inventory', {
        // raw items
        hydrogen:    { type: DataTypes.DOUBLE },
        helium:      { type: DataTypes.DOUBLE },
        lithium:     { type: DataTypes.DOUBLE },
        carbon:      { type: DataTypes.DOUBLE },
        nitrogen:    { type: DataTypes.DOUBLE },
        oxygen:      { type: DataTypes.DOUBLE },
        fluorine:    { type: DataTypes.DOUBLE },
        sodium:      { type: DataTypes.DOUBLE },
        magnesium:   { type: DataTypes.DOUBLE },
        aluminium:   { type: DataTypes.DOUBLE },
        silicon:     { type: DataTypes.DOUBLE },
        phosphorus:  { type: DataTypes.DOUBLE },
        sulfur:      { type: DataTypes.DOUBLE },
        chlorine:    { type: DataTypes.DOUBLE },
        titanium:    { type: DataTypes.DOUBLE },
        chromium:    { type: DataTypes.DOUBLE },
        manganese:   { type: DataTypes.DOUBLE },
        iron:        { type: DataTypes.DOUBLE },
        cobalt:      { type: DataTypes.DOUBLE },
        nickel:      { type: DataTypes.DOUBLE },
        copper:      { type: DataTypes.DOUBLE },
        zinc:        { type: DataTypes.DOUBLE },
        silver:      { type: DataTypes.DOUBLE },
        tin:         { type: DataTypes.DOUBLE },
        iodine:      { type: DataTypes.DOUBLE },
        xenon:       { type: DataTypes.DOUBLE },
        tungsten:    { type: DataTypes.DOUBLE },
        platinum:    { type: DataTypes.DOUBLE },
        gold:        { type: DataTypes.DOUBLE },
        mercury:     { type: DataTypes.DOUBLE },
        lead:        { type: DataTypes.DOUBLE },
        uranium:     { type: DataTypes.DOUBLE },

        // alloys and crystals
        bronze:      { type: DataTypes.DOUBLE },
        steel:       { type: DataTypes.DOUBLE },
        graphite:    { type: DataTypes.DOUBLE },
        glass:       { type: DataTypes.DOUBLE },

        // chemical compounds
        carbon_diox: { type: DataTypes.DOUBLE },
        oxi_gas:     { type: DataTypes.DOUBLE },
        water:       { type: DataTypes.DOUBLE },
        glucose:     { type: DataTypes.DOUBLE },
        plastic:     { type: DataTypes.DOUBLE },

        // living things
        algae_like:    { type: DataTypes.DOUBLE },
        algae_quality: { type: DataTypes.DOUBLE },
        fungi_like:    { type: DataTypes.DOUBLE },
        fungi_quality: { type: DataTypes.DOUBLE },

        //machinery
        light_furnace:  { type: DataTypes.DOUBLE },
        medium_furnace: { type: DataTypes.DOUBLE },
        heavy_furnace:  { type: DataTypes.DOUBLE },


    })



    const Planet = conn.define('planet', {
        name: {
            type: DataTypes.CHAR(80),
            allowNull: false,
            unique: true
        },

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        mass: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },

        coordx: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },

        coordy: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },

        coordz: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },

        seedreal: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },

        seedimag: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        }
    }, {})


    User.hasOne(Inventory, {
        foreignKey: {
            type: DataTypes.UUID,
            allowNull: false
        }
    })

    User.hasOne(Planet, {
        foreignKey: {
            type: DataTypes.UUID,
            allowNull: true
        }
    })

    return {
        User,
        Inventory,
        Planet
    }
}

