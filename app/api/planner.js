import axios from 'axios'

import { getToken, getUser } from './security'

export const getPrioTasks = ({
    category = 'doing',
    due,
    username,
  }, cb
) => {
  const token = getToken()
  axios({
    url: '/api/planner/getDueTasks',
    method: 'GET',
    headers: {
      token,
      username,
    },
    params: {
      username,
      category,
      due,
    },
  }).then(r => cb(r.data)).catch(e => new Error(e))
}

export const getOptimalChoicesFor = (type, cb) => {
  const token = getToken()
  const username = getUser()
  axios({
    url: '/api/planner/getOptimalTasks',
    method: 'GET',
    headers: {
      token,
      username,
    },
    params: {
      type,
    },
  }).then(r => cb(r.data)).catch(e => new Error(e))
}