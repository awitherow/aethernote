import axios from 'axios'

function get (cb) {
  axios.get('/api/notes')
    .then(res => {
      cb(res.data)
    })
    .catch(e => console.log(e))
}

function add (entry, cb) {
  const length = entry.content.length
  if (length > 32) {
    entry.title = `${entry.content.substring(0, 32)}`
  } else {
    entry.title = `${entry.content.substring(0, length)}`
  }
  axios.post('/api/notes', entry).then(cb)
}

function remove (id, cb) {
  axios.delete(`/api/notes/${id}`).then(cb)
}

function update (orig, diff, cb) {
  const update = Object.assign(orig, diff)
  axios.put(`/api/notes/${orig.id}`, {
    update
  }).then(cb)
}

export {
  get,
  add,
  remove,
  update
}
