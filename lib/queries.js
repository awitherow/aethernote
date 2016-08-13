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

const getEntries = (req, res, next) => {
  db.any('select * from entries')
    .then(data => {
      res.status(200)
        .json({
          status: 'success',
          data,
          message: 'Retrieved all tasks',
        })
    }).catch(err => next(err))
}
