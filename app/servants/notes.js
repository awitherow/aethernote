function get(cb) {
  fetch('/api/notes')
    .then(r => r.json())
    .then(res => {
      cb(res.data);
    })
    .catch(e => console.log(e));
}

function add(entry, cb) {
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry),
  }).then(cb);
}

export {
  get,
  add,
};
