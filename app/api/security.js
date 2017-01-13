export const checkAuth = (id, key, cb) =>
  fetch(`/api/auth?id=${id}&key=${key}`)
    .then(r => r.json())
    .then(res => {
      cb(res.data)
    }).catch(e => console.log(e))

export const isUserAuthenticated = () =>
  localStorage.getItem('token') !== null

export const authenticateUser = (token) =>
  localStorage.setItem('token', token)

export const deauthenticateUser = () =>
   localStorage.removeItem('token')

export const getToken = () => 
  localStorage.getItem('token')