import axios from 'axios'

function get (cb) {
  axios.get('/api/profile/', cb)
    .then(res => {
      cb(res.data)
    })
    .catch(e => console.log(e))
}

export {
  get
}
