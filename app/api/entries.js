import { categories } from '../lib/schema'
import moment from 'moment'
import axios from 'axios'

import { sharedHeaders } from './_helpers'

import { getToken } from './security'

const get = (username, cb) => {
  const token = getToken()
  axios({
    url: '/api/notes',
    method: 'GET',
    params: {
      username,
      token,
    },
  }).then(r => cb(r.data)).catch(e => console.log(e))
}

function add(entry, username, cb) {
  if (!entry.category) {
    entry.category = categories[entry.type][0]
  }

  if (!entry.prio) {
    entry.prio = 1
  }

  if (entry.type !== 'habit') {
    entry.title = `${entry.content.substring(0, 32)}`

    if (entry.type === 'exercise') {
      entry.context = 'health'
      delete entry.content
      entry.content = {
        total: 0,
        best: {
          date: moment(),
          value: 0,
          multiplier: 0,
        },
      }
    }
  } else {
    entry.title = entry.content
    entry.content = 0
  }

  const token = getToken()
  axios({
    url: '/api/notes',
    method: 'POST',
    params: {
      username,
      token,
    },
    data: {
      entry,
    },
  }).then(r => cb(r)).catch(e => console.log(e))
}

function remove(id, cb) {
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
  }).then(cb)
}

function update(orig, diff, cb) {
  const update = Object.assign(orig, diff)
  fetch(`/api/notes/${orig.id}`, {
    method: 'PUT',
    headers: sharedHeaders,
    body: JSON.stringify({
      update,
    }),
  }).then(cb)
}

function toggleCompletion(entry, cb) {
  fetch(`/api/notes/complete/${entry.id}`, {
    method: 'PUT',
    headers: sharedHeaders,
    body: JSON.stringify({
      complete: !entry.complete,
      id: entry.id,
    }),
  }).then(cb)
}

export {
  get,
  add,
  remove,
  update,
  toggleCompletion,
}
