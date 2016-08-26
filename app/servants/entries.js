function get(cb) {
  fetch('/api/entries')
    .then(r => r.json())
    .then(res => {
      cb(res);
    })
    .catch(e => console.log(e));
}

export {
  get,
};
