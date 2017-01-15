import db from '../db'

import { trackHabit, trackExercise } from './tracking'

export const getNotes = (req, res, next) =>
  db.any('select * FROM entries WHERE username=${username} ORDER BY modified desc', { 
    username: req.query.username,
  }).then(data => 
    res.status(200)
      .json({
        status: 'success',
        data,
        message: 'Retrieved entry',
      })
  ).catch(err => next(err))

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
  const { title, content, category, type, prio } = req.body.entry
  const { username } = req.query
  db.none('insert into entries(title, content, category, type, prio, username)' +
      'values($1, $2, $3, $4, $5, $6)',
    [title, content, category, type, prio, username])
  .then(() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'Inserted one entry',
    })
  }).catch(err => next(err))
}

export const updateNote = (req, res, next) => {
  const {
    id, title, content, prio, category, context, type, tally, value,
  } = req.body.update
  // TODO !! handle changed habit names/exercise names for linked db. use ID?
  if (tally) {
    switch(type) {
      case 'habit': trackHabit({
        name: title,
        value,
      }); break
      case 'exercise': trackExercise({
        exercise: id,
        value,
      })
    }
  }
  db.none(
    'update entries ' +
    'set title=$1, content=$2, prio=$3, category=$4, context=$5, type=$6' +
    'where id=$7',
    [title, content, prio, category, context, type, id]
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
  const username = req.query.username
  db.result('delete from entries where id = ${id} AND username = ${username}',{ 
    id,
    username,
  }).then(result => {
    res.status(200)
    .json({
      status: 'success',
      message: `Removed ${result.rowCount} entry`,
    })
  }).catch(err => next(err))
}

export const toggleCompletion = (req, res, next) => {
  const { complete, id } = req.body
  db.none('update entries set complete=$1 where id=$2', [complete, id])
    .then(() => {
      res.status(200)
      .json({
        status: 'success',
        message: 'Updated entry',
      })
    }).catch(err => next(err))
}
