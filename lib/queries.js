import promiseLib from 'bluebird'
import pg from 'pg-promise'

const pgp = pg({
  promiseLib,
})

const db = pgp(process.env.DATABASE_URL)

export default {
  getEntries,
  // getEntry,
  // createEntry,
  // updateEntry,
  // removeEntry,
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

const getEntry = (res, req, next) => {
  const { id } = req.params
  db.one(`select * from entries where id = ${id}`)
    .then(data => {
      res.status(200)
        .json({
          status: 'success',
          data,
          message: 'Retrieved entry',
        })
    }).catch(err => next(err))
}

const createEntry = (req, res, next) => {
  const { content, prio } = req.body
  db.none(`insert into pups(${content}, ${prio})`)
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one entry'
        })
    }).catch(err => next(err))
}
