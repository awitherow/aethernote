import db from '../db'

import {
  queryDueTasks, queryOptimalTasks,
} from '../db'

export const getDueTasks = (req, res, next) =>
  db.any(queryDueTasks, { 
    username: req.headers.username,
    due: req.params.due,
    category: req.params.category,
  }).then(data => res.status(200).json({
    status: 'success',
    data,
    message: 'Retrieved entries',
  })).catch(err => next(err))

export const getOptimalTasks = (req, res, next) => {
  const username = req.headers.username
  switch(req.query.type) {
    // get most important tasks, should return a maximum of 10 results.
    case 'VIP_TASKS': return db.any(queryOptimalTasks, { 
      username,
    }).then(data => res.status(200).json({
      status: 'success',
      data,
      message: 'Retrieved optimal tasks',
    })).catch(err => next(err))

    default: return res.status(200).json({
      status: 'success',
      data: null,
      message: 'Retrieved entries',
    })
  }
}