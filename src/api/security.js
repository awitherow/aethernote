import axios from 'axios'
export function checkAuth (id, key, cb) {
  axios.get(`/api/auth?id=${id}&key=${key}`)
    .then(res => {
      cb(res.data)
    })
    .catch(e => console.log(e))
}
