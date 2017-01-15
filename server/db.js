const pgp = require('pg-promise')()

pgp.pg.defaults.ssl = true
const db = pgp(process.env.DATABASE_URL)

export default db
