import { db } from './store';

function get(cb) {
  db.notes.getAll()
    .then(records => cb(records))
    .catch(e => console.log(e));
}

function add(entry, cb) {
  const length = entry.content.length;
  if (length > 32) {
    entry.title = `${entry.content.substring(0, 32)}...`;
  } else {
    entry.title = `${entry.content.substring(0, length)}`;
  }

  db.notes.put(entry).then(cb);
}

const remove = (id, cb) =>  db.notes.delete(id).then(cb);

function update(orig, diff, cb) {
  const update = Object.assign(orig, diff);
  fetch(`/api/notes/${orig.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      update,
    }),
  }).then(cb);
}

export {
  get,
  add,
  remove,
  update,
};
