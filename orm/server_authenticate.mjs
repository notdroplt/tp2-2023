
import crypto from "node:crypto"
import { database } from "./database.mjs"
import * as serror from "./server_auth_errors.mjs"
import { Router } from "express"

let router = Router()

router.post('/signin', async (req, res) => {
    if (req.body.player.length < 4 || req.body.player.length > 30) {
        return res.send({
            ok: false,
            error: serror.USERNAME_LENGTH
        })
    }

    const records = await database.models.User.findAll({
        where: {
            playername: req.body.player,
        }
    })

    if (records.length === 0) {
        return res.send({
            ok: false,
            error: serror.USERNAME_DOES_NOT_EXIST
        })
    }

    const player = records[0]

    let given_hash = crypto.createHash('sha256')
    let actual_hash = crypto.createHash('sha256')

    given_hash.update(req.body.password)
    actual_hash.update(player.dataValues.password)

    const given_digest = given_hash.digest()
    const actual_digest = actual_hash.digest()

    if (given_digest !== actual_digest) {
        return res.send({
            ok: false,
            error: serror.USERNAME_PASSWORD_MISMATCH
        })
    }

    return res.send({
        ok: true
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

export { router as auth_router }