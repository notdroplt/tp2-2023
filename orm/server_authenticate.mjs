
import crypto from "node:crypto"
import { database } from "./database.mjs"
import * as serror from "./server_auth_errors.mjs"
/**
 * middleware for signing a player up
 * @param {Request} req request
 * @param {Response} res response
 * @param {NextFunction} next next
 */
async function signup(req, res, next) {
    if (req.body.player.length < 4 || req.body.player.length > 30) {
        req.shouldSkipNext = true
        res.send({
            ok: false,
            error: serror.USERNAME_LENGTH
        })

        return next('route')
    }

    const records = await database.models.Player.findAll({
        where: {
            playertag: req.body.player
        }
    })
    
    if (records.length === 0) {
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
    }
    
    return res.send({
        ok: false,
        error: serror.USERNAME_ALREADY_TAKEN
    })
}

/**
 * middleware for simple authentication
 * @param {Request} req request
 * @param {Response} res response
 * @param {NextFunction} next next
 */
async function authenticate (req, res, next) {
    if (req.body.player.length < 4 || req.body.player.length > 30) {
        req.shouldSkipNext = true
        res.send({
            ok: false,
            error: serror.USERNAME_LENGTH
        })

        return next('route')
    }

    const records = await database.models.User.findAll({
        where: {
            playername: req.body.player,
            password
        }
    })

    if (records.length === 0) {
        req.shouldSkipNext = true
        res.send({
            ok: false,
            error: serror.USERNAME_DOES_NOT_EXIST
        })

        return next('route')
    }

    const player = records[0]

    let given_hash = crypto.createHash('sha256')
    let actual_hash = crypto.createHash('sha256')
    
    given_hash.update(req.body.password)
    actual_hash.update(player.dataValues.password)

    const given_digest = given_hash.digest()
    const actual_digest = actual_hash.digest()

    if (given_digest !== actual_digest) {
        req.shouldSkipNext = true
        res.send({
            ok: false,
            error: serror.USERNAME_PASSWORD_MISMATCH
        })

        return next('route')
    }

    req.player = player.dataValues

    next()
}

export {signup, authenticate}