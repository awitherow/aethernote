import db from '../db'

import {
  getMostImportantTasks as MITQuery,
} from '../db'

export const getMostImportantTasks = (req, res, next) =>
  db.any(MITQuery, { 
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