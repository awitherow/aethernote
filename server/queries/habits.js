import promiseLib from 'bluebird'
import pg from 'pg-promise'

const pgp = pg({
  promiseLib,
})

pgp.pg.defaults.ssl = true
const db = pgp(process.env.DATABASE_URL)

export const addHabit = (req, res, next) => {
  db.none('insert into habits(name, value)values( ${name}, ${value})',
  req.body).then(() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'Inserted habit entry',
    })
  }).catch(err => next(err))
}
