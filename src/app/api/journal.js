function get(cb) {
  fetch('/api/journalEntries')
    .then(r => r.json())
    .then(res => {
      cb(res.data);
    })
    .catch(e => console.log(e));
}

export {
  get
};
