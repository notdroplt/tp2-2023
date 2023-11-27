import { createHash } from "node:crypto"

let sessions = [ ];

/** @typedef {{pid: string, sid: string, time: Number}} Session */

/**
 * 
 * @param {string} playerid 
 * @returns string session id
 */
export const get_session = (playerid) => {
    const index = sessions.findIndex(x => x.pid == playerid)

    if (index !== -1) {
        sessions[index].time = Date.now()
        return sessions[index].sid
    }

    const digest = createHash('sha256')
                    .update(playerid)
                    .update(`${Date.now()}`)
                    .digest('base64')

    sessions.push({ pid: playerid, sid: digest, time: Date.now() });
    return digest
}

const session_status = {
    /** session is up to date */
    SESSION_OK: 0,

    /** session has expired */
    SESSION_EXPIRED: 1,

    /** session does not exist */
    SESSION_DNE: 2
}

/**
 * 
 * @param {Session} session current session
 * @returns session is expired or not
 */
const expired = (session)  => Date.now() - session.time < 1000 * 60 * 15

/**
 * check a session status
 * @param {string} playerid current player id
 * @returns 
 */
export const exists_session = (playerid) => {
    const index = sessions.findIndex(x => x.pid == playerid)
    if (index == -1) return session_status.SESSION_DNE

    if (expired(sessions[index])) return session_status.SESSION_EXPIRED

    return session_status.SESSION_OK
}

setInterval(() => {
    const time = Date.now()
    // 15 minutos por sessão
    sessions.filter(x => !expired(x) )
})


