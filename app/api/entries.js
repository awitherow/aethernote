import categories from '../lib/schema/categories'

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
    switch(entry.type) {
      case 'note': entry.category = categories.note[0]; break
      case 'journal': entry.category = categories.journal[0]; break
    }
  }

  const length = entry.content.length
  if (length > 32) {
    entry.title = `${entry.content.substring(0, 32)}`
  } else {
    entry.title = `${entry.content.substring(0, length)}`
  }

  if (!entry.prio) entry.prio = false

  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
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
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      update,
    }),
  }).then(cb)
}

export {
  get,
  add,
  remove,
  update,
}