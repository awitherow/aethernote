import axios from 'axios'

import { getToken } from './security'

export const getPrioTasks = ({
    category = 'doing',
    due,
    username,
  }, cb
) => {
  const token = getToken()
  axios({
    url: '/api/planner/getVIP',
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