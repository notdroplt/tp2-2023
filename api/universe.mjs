import { Router } from "express"
import { database } from "../orm/database.mjs";
import { Fractals } from "../core/fractals.mjs";

const router = Router()

router.get('/convergeNextTo/:real/:imag/:prep/', async (req, res) => {
    Fractals.julia_divergence_range(Universe)
    
})