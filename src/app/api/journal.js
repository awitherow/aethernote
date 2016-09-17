function getEntries(cb) {
  fetch('/api/journalEntries')
    .then(r => r.json())
    .then(res => {
      cb(res.data);
    }).catch(e => console.log(e));
}

function saveEntry(entry, cb) {
  fetch('/api/journalEntries', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(entry)
  }).then(cb).catch(e => console.log(e));
}

export {
  getEntries,
  saveEntry
};
