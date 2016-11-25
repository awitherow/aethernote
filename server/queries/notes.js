import promiseLib from 'bluebird'
import pg from 'pg-promise'

const pgp = pg({
  promiseLib,
})

pgp.pg.defaults.ssl = true
const db = pgp(process.env.DATABASE_URL)

export const getNotes = (req, res, next) => {
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

export const getNote = (req, res, next) => {
  const { id } = req.params
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

export const createNote = (req, res, next) => {
  if (!req.body.type) { req.body.type = 'note' }
  db.none('insert into entries(title, content, prio, category, type)' +
      'values( ${title}, ${content}, ${prio}, ${category}, ${type})',
    req.body)
  .then(() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'Inserted one entry',
    })
  }).catch(err => next(err))
}

export const updateNote = (req, res, next) => {
  const { id, title, content, prio, category} = req.body.update
  db.none(
    'update entries ' +
    'set title=$1, content=$2, prio=$3, category=$4 ' +
    'where id=$5',
    [title, content, prio, category, id]
  ).then(() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'Updated entry',
    })
  }).catch(err => next(err))
}

export const removeNote = (req, res, next) => {
  const id = parseInt(req.params.id)
  db.result(`delete from entries where id = ${id}`)
  .then(result => {
    res.status(200)
    .json({
      status: 'success',
      message: `Removed ${result.rowCount} entry`,
    })
  }).catch(err => next(err))
}
