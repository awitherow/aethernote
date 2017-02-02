import axios from 'axios'
import moment from 'moment'

import { getToken, getUser } from './security'

const sharedHeaders = {
  token: getToken(),
  username: getUser(),
}

export const getPrioTasks = ({ category = 'doing', due, username }, cb) => {
  let date = moment(due).format('YYYY-MM-DD')
  axios({
    url: '/api/planner/getDueTasks',
    method: 'GET',
    headers: sharedHeaders,
    params: {
      username,
      category,
      due: date,
    },
  }).then(r => cb(r.data)).catch(e => new Error(e))
}

export const getOptimalChoicesFor = (type, cb) => {
  axios({
    url: '/api/planner/getOptimalTasks',
    method: 'GET',
    headers: sharedHeaders,
    params: {
      type,
    },
  }).then(r => cb(r.data)).catch(e => new Error(e))
}

export const setItemAsDue = (id, due) => {
  let date = moment(due).format('YYYY-MM-DD')
  axios({
    url: '/api/planner/setItemAsDue',
    method: 'GET',
    headers: sharedHeaders,
    params: {
      id,
      due: date,
    },
  }).then(() => console.log(`${id} set with due date ${due}`)).catch(e => new Error(e))
}
