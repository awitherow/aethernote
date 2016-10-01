export function checkAuth(id, key, cb) {
  fetch(`/api/auth?id=${id}&key=${key}`)
    .then(r => r.json())
    .then(res => {
      cb(res.data);
    })
    .catch(e => console.log(e));
}
