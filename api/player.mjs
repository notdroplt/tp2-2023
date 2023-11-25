import { Router } from "express"
import { database } from "../orm/database.mjs";
import { UNDEFINED_USERID } from "../orm/server_auth_errors.mjs";

const router = Router();

router.get('/:name', async (req, res) => {
    const player = await database.models.Player.findOne({ where: { playertag: req.params.name }})

    if (player === null) 
        return res.sendStatus(404)

    const enablePrivate = player.dataValues.playerid === req.body.playerid;
    console.log(player)

    return res.send({
        playertag: player.dataValues.playertag,
        password: enablePrivate ? player.dataValues.password : null
    })
    
})

router.get('/:name/nearby/', async (req, res) => {
    if (req.body.playerid === undefined) 
        return res.send({
            ok: false,
            error: UNDEFINED_USERID
        })
    
    const player = await database.models.Player.findOne({ where: { playerid: req.body.playerid }})

    console.log(player.dataValues)

    database.models.Player.findAll({
        where: {
            
        }
    })
})

export { router as player_router };