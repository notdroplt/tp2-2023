import { createHash } from "node:crypto"

let sessions = [ ];

export const get_session = (playerid) => {
    console.log(sessions)
    const index = sessions.findIndex(x => x.pid == playerid)

    if (index !== -1) {
        sessions[index].time = Date.now()
        return sessions[index].sid
    }

    const digest = createHash('sha256')
                    .update(playerid)
                    .update(`${Date.now()}`)
                    .digest('base64')

    sessions.push({ pid: playerid, sid: digest, time: Date.now() })
    return digest
}


setInterval(() => {
    const time = Date.now()
    // 15 minutos por sessão
    sessions.filter(x => time - x.time >= 1000 * 60 * 15 )
})


