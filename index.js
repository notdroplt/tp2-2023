import express from 'express';
import { Sequelize } from 'sequelize';

import compression from 'compression'
import { Planet } from './core/planet.mjs';
import { Coordinate } from './core/misc.mjs';
import { Star } from './core/star.mjs';

import ejs from 'ejs'
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { database } from './orm/database.mjs';

import { auth_router } from './orm/server_authenticate.mjs';
import { player_router } from './api/player.mjs';
import { Complex } from './core/complex.mjs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(compression())
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'static')));

app.use('/api/player', player_router)
app.use('/api/auth', auth_router)

Object.values(database.models).forEach(async el => await el.sync())


let star = new Star(1, new Coordinate(0, 0, 0))


let plt = new Planet(1.534e12, star, new Complex(-.05, 1.5))
console.log(plt.name)
app.use(function (req, res, next) {
    console.log(`${req.method} "${req.path}" ${req.ip}`)

    next();
});

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/api/star/:starId/', (req, res) => {
    res.send({})
})

app.get('/api/planet/:plname/', (req, res) => {
    if (req.params.plname != plt.name) {
        res.status(404)
        .send({
            planet: null
        })

    }
    res.send(plt)
})

app.get('/api/planet/:plname/prop/:prop', (req, res) => {
    if (req.params.plname != plt.name) {
        res.status(404)
        .send({
            planet: null,
            has_property: false,
            property: null
        })
    }

    if (!(req.params.prop in plt)) {
        res.status(400)
        .send({
            planet: req.params.plname,
            has_property: false,
            property: null
        })
    }  

    res.send({
        planet: req.params.plname,
        has_property: true,
        property: plt[`${req.params.prop}`]
    })
})

app.listen(3000, () => {
    console.log("listening on port 3000")
})