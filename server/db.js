import path from 'path'
const pgp = require('pg-promise')()

pgp.pg.defaults.ssl = true
export default pgp(process.env.DATABASE_URL)

function sql(file) {
  return new pgp.QueryFile(path.join(__dirname, file), {
    minify: true,
  })
}

export const queryDueTasks = sql('./queries/sql/queryDueTasks.sql')
export const queryOptimalTasks = sql('./queries/sql/queryOptimalTasks.sql')