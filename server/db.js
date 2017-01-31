const pgp = require('pg-promise')()

pgp.pg.defaults.ssl = true
export default pgp(process.env.DATABASE_URL)

function sql(file) {
  return new pgp.QueryFile(file, {minify: true})
}

export const queries = {
  getMostImportantTasks: sql('./queries/sql/getMostImportantTasks'),
}