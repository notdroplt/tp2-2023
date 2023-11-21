
import crypto from "node:crypto"
import { database } from "./database.mjs"

/**
 * middleware for login a user in
 * @param {Request} req request
 * @param {Response} res response
 * @param {NextFunction} next next
 */
async function login(req, res, next) {
    if (req.body.user.length < 4 || req.body.user.length > 30) {
        req.shouldSkipNext = true
        res.send({
            ok: false,
            error: 'nome de usuário'
        })

        return next('route')
    }

    const records = await database.models.User.findAll({
        where: {
            username: req.body.user
        }
    })

           
    let hash = crypto.createHash('sha256')
    hash.update(req.body.password)
    
    let digest = hash.digest('base64')
    if (records.length === 0) {
        await database.models.User.create({
            username: req.body.user,
            password: digest
        })

        await database.db.sync()
    }
    
    next()
}

/**
 * middleware for sign a user in
 * @param {Request} req request
 * @param {Response} res response
 * @param {NextFunction} next next
 */
function signin(req, res, next) {

}

/**
 * middleware for simple authentication
 * @param {Request} req request
 * @param {Response} res response
 * @param {NextFunction} next next
 */
function authenticate (req, res, next) {
    
}

export {signin, login, authenticate}