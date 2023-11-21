import { generate_models } from "./models.mjs";

import { Sequelize } from "sequelize";

const database = {
    db: new Sequelize('sqlite:app.db'),
    get models() { return generate_models(this.db) }
}

export { database }