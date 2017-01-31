import db from '../db'

import {
  getPrioTasksQuery,
} from '../db'

export const getPrioTasks = (req, res, next) =>
  db.any(getPrioTasksQuery, { 
    username: req.headers.username,
    due: req.params.due,
    category: req.params.category,
  }).then(data => 
    res.status(200)
      .json({
        status: 'success',
        data,
        message: 'Retrieved entries',
      })
  ).catch(err => next(err))