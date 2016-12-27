import db from '../db'

import { trackHabit } from './habits'
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
  db.none('insert into entries(title, content, category, type, prio)' +
      'values( ${title}, ${content}, ${category}, ${type}, ${prio})',
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
  const { id, title, content, prio, category, context, type } = req.body.update
  const mostLikelyOnlyHabitTracked = req.body.update.length < 2
  if (type === 'habit' && mostLikelyOnlyHabitTracked) {
    trackHabit({
      name: title,
      value: 1,
    })
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
  db.result(`delete from entries where id = ${id}`)
  .then(result => {
    res.status(200)
    .json({
      status: 'success',
      message: `Removed ${result.rowCount} entry`,
    })
  }).catch(err => next(err))
}
