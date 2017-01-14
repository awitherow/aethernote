import axios from 'axios'

export const login = (username, password, cb) =>
  axios({
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    url: '/api/auth/login',
    data: {
      username,
      password,
    }
  }).then(data => cb(data)).catch(e => cb(e))

export const signup = (username, password, cb) =>
  axios({
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    url: '/api/auth/signup',
    data: {
      username,
      password,
    }
  }).then(data => cb(data)).catch(e => cb(e))


export const isUserAuthenticated = () =>
  localStorage.getItem('token') !== null

export const authenticateUser = (token) =>
  localStorage.setItem('token', token)

export const deauthenticateUser = () =>
  localStorage.removeItem('token')

export const getToken = () =>
  localStorage.getItem('token')