import { categories } from '../lib/schema'
import moment from 'moment'

const sharedHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

function get(cb) {
  fetch('/api/notes')
    .then(r => r.json())
    .then(res => {
      cb(res.data)
    })
    .catch(e => console.log(e))
}

function add(entry, cb) {
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

  fetch('/api/notes', {
    method: 'POST',
    headers: sharedHeaders,
    body: JSON.stringify(entry),
  }).then(cb)
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
