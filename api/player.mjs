import { Router } from "express"
import { database } from "../orm/database.mjs";
import { UNDEFINED_USERID } from "../orm/server_auth_errors.mjs";

let router = Router();

router.post('/:name/', async (req, res) => {
    const player = await database.models.Player.findOne({ where: { playertag: req.params.name }})

    console.log({player})

    if (player === null) 
        return res.sendStatus(404)

    const enablePrivate = player.dataValues.playerid === req.body.playerid;

    return res.send({
        playertag: player.dataValues.playertag,
        password: enablePrivate ? player.dataValues.password : null,
        position: {
            real: player.dataValues.coordx,
            imag: player.dataValues.coordy,
            perp: player.dataValues.coordz,
        }
    })
    
})

router.get('/:name/nearby/', async (req, res) => {
    if (req.body.playerid === undefined) 
        return res.send({
            ok: false,
            error: UNDEFINED_USERID
        })
    
    const player = await database.models.Player.findOne({ where: { playerid: req.body.playerid }})

    database.models.Player.findAll({
        where: {
            
        }
    })
})

router.post('/:name/travelto/:galaxy/:system/:planet/:real/:imag/:perp/', async (req, res) => {
    const player = await database.models.Player.findOne({playertag: req.params})
}) 

export { router as player_router };