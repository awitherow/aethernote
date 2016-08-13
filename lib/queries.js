import promiseLib from 'bluebird'
import pg from 'pg-promise'

const pgp = pg({
  promiseLib,
})

const db = pgp(process.env.DATABASE_URL)

export default {
  getEntries,
  getEntry,
  createEntry,
  updateEntry,
  removeEntry,
}
