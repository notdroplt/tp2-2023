import { database } from "./database.mjs"
import crypto from "node:crypto"

export async function create_player(playertag, password) {
    let hash = crypto.createHash('sha256')
    hash.update(password)
    let digest = hash.digest('base64')
    const time = new Date().toISOString()
    hash = crypto.createHash('sha256')
    hash.update(password)
    hash.update(playertag)
    hash.update(time)
    const playerid = hash.digest('base64')
    console.log(`USER SIGNUP: { Player: ${playertag}, time: ${time}, playerid: ${playerid}}`)
    const player = await database.models.Player.create({
        playertag: req.body.player,
        password: digest,
        playerid: playerid,
        
    })

    await database.db.sync()

    return player
}