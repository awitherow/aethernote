import axios from 'axios'

import { sharedHeaders } from './_helpers'

export const login = (username, password, cb) =>
  axios({
    method: 'post',
    headers: sharedHeaders,
    url: '/auth/login',
    data: {
      username,
      password,
    },
  }).then(data => cb(data)).catch(e => cb(e))

export const signup = (username, password, cb) =>
  axios({
    method: 'post',
    headers: sharedHeaders,
    url: '/auth/signup',
    data: {
      username,
      password,
    },
  }).then(data => cb(data)).catch(e => cb(e))


export const isUserAuthenticated = () =>
  localStorage.getItem('aether-token') !== null

export const authenticateUser = (token, username) => {
  localStorage.setItem('aether-username', username)
  localStorage.setItem('aether-authenticated', true)
  localStorage.setItem('aether-token', token)
}

export const deauthenticateUser = () =>
  localStorage.removeItem('aether-token')

export const getToken = () => 
  localStorage.getItem('aether-token')

export const getUser = () =>
  localStorage.getItem('aether-username')

export const getAuth = () =>
  localStorage.getItem('aether-authenticated')