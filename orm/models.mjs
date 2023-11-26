import { DataTypes, Sequelize } from "sequelize";

/**
 * generate database models
 * @param {Sequelize} conn database connection
 */
export function generate_models(conn) {
    const Player = conn.define('Player', {
        playertag: {
            type: DataTypes.CHAR(30),
            allowNull: false,
            unique: true
        },

        password: { type: DataTypes.CHAR(44), allowNull: false },

        playerid: { type: DataTypes.CHAR(44), allowNull: false },

        coordx: { type: DataTypes.DOUBLE, allowNull: false, defaultValue: 0.0 },

        coordy: { type: DataTypes.DOUBLE, allowNull: false, defaultValue: 0.0 },

        coordz: { type: DataTypes.DOUBLE, allowNull: false, defaultValue: 0.0 },
    })


    const Inventory = conn.define('Inventory', {
        // raw items
        hydrogen: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        helium: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        lithium: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        carbon: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        nitrogen: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        oxygen: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        fluorine: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        sodium: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        magnesium: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        aluminium: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        silicon: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        phosphorus: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        sulfur: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        chlorine: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        titanium: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        chromium: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        manganese: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        iron: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        cobalt: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        nickel: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        copper: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        zinc: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        silver: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        tin: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        iodine: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        xenon: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        tungsten: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        platinum: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        gold: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        mercury: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        lead: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        uranium: { type: DataTypes.DOUBLE, defaultValue: 0.0 },

        // alloys and crystals
        bronze: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        steel: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        graphite: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        glass: { type: DataTypes.DOUBLE, defaultValue: 0.0 },

        // chemical compounds
        carbon_diox: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        oxi_gas: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        water: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        glucose: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        plastic: { type: DataTypes.DOUBLE, defaultValue: 0.0 },

        // living things
        algae_like: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        algae_quality: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        fungi_like: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        fungi_quality: { type: DataTypes.DOUBLE, defaultValue: 0.0 },

        //machinery
        light_furnace: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        medium_furnace: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        heavy_furnace: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
    })



    const Planet = conn.define('Planet', {
        name: { type: DataTypes.CHAR(16), allowNull: false },

        mass: { type: DataTypes.DOUBLE, allowNull: false },

        coordx: { type: DataTypes.DOUBLE, allowNull: false },

        coordy: { type: DataTypes.DOUBLE, allowNull: false },

        coordz: { type: DataTypes.DOUBLE, allowNull: false },

        seedReal: { type: DataTypes.DOUBLE, allowNull: false },

        seedImag: { type: DataTypes.DOUBLE, allowNull: false }
    })

    const System = conn.define('System', {
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

        planetCount: {
            type: DataTypes.SMALLINT,
            allowNull: false
        },

        seedReal: { type: DataTypes.DOUBLE, allowNull: false },

        seedImag: { type: DataTypes.DOUBLE, allowNull: false }
    })


    Player.Inventory = Player.hasOne(Inventory)
    Player.Planet = Player.belongsTo(Planet)
    Player.System = Player.belongsTo(System)

    Planet.Player = Planet.hasMany(Player)
    Planet.System = Planet.belongsTo(System)
    
    System.Player = System.hasMany(Player)
    System.Planet = System.hasMany(Planet)
    
    Inventory.Player = Inventory.belongsTo(Player)
    
    return { Player, Inventory, Planet, System }
}

