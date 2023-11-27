
import crypto from "node:crypto"
import { database } from "./database.mjs"
import * as serror from "./server_auth_errors.mjs"
import { Router } from "express"
import { exists_session, get_session } from "./session.mjs"

let router = Router()

router.post('/signin', async (req, res) => {
    if (req.body.playertag.length < 4 || req.body.playertag.length > 30) {
        return res.send({
            ok: false,
            error: serror.USERNAME_LENGTH
        })
    }

    const records = await database.models.Player.findAll({
        where: {
            playertag: req.body.playertag,
            playerid: req.body.playerid
        }
    })

    if (records.length === 0) {
        return res.send({
            ok: false,
            error: serror.USERNAME_DOES_NOT_EXIST
        })
    }

    const player = records[0]

    if (req.body.playerid !== player.dataValues.playerid) {
        return res.send({
            ok: false,
            error: serror.USERNAME_PASSWORD_MISMATCH
        })
    }

    return res.send({
        ok: true,
        session: get_session(req.body.playerid)
    })
})

router.post('/signup', async (req, res) => {
    if (req.body.player.length < 4 || req.body.player.length > 30) {
        return res.send({
            ok: false,
            error: serror.USERNAME_LENGTH
        })
    }

    const records = await database.models.Player.findAll({
        where: {
            playertag: req.body.player
        }
    })

    if (records.length !== 0)
        return res.send({
            ok: false,
            error: serror.USERNAME_ALREADY_TAKEN
        })

    let hash = crypto.createHash('sha256')
    hash.update(req.body.password)
    let digest = hash.digest('base64')
    const time = new Date().toISOString()
    hash = crypto.createHash('sha256')
    hash.update(req.body.password)
    hash.update(req.body.player)
    hash.update(time)
    const playerid = hash.digest('base64')
    console.log(`PLAYER SIGNUP: { Player: ${req.body.player}, time: ${time}, playerid: ${playerid}}`)
    const player = await database.models.Player.create({
        playertag: req.body.player,
        password: digest,
        playerid: playerid
    }, {
        include: [{
            association: database.models.Player.Inventory
        }]
    })

    await database.db.sync()

    return res.send({
        ok: true,
        playertag: req.body.player,
        playerid: playerid
    })
})


function authenticate_body(req, res, next) {
    const cur_session = exists_session(req.body.playerid)
    if (cur_session != 0) {
        return res.send({
            ok: false,
            error: serror.INVALID_SESSION
        })
    }
}

export { router as auth_router }