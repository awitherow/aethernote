import express from 'express'
import bodyParser from 'body-parser'
import favicon from 'serve-favicon'
import {
  getNotes, getNote, createNote, updateNote, removeNote, toggleCompletion,
} from './queries/notes'
import {
  getDueTasks, getOptimalTasks, setItemAsDue,
} from './queries/planner'
import { AttemptLogin, AttemptSignup } from './queries/auth'
import compression from 'compression'

// Apply compression
const app = express()
app.use(compression())

// Development environment checks
if (process.env.NODE_ENV === "development") {
  require('dotenv').config()
} else {
  app.get('*.js', function (req, res, next) {
    req.url = req.url + '.gz'
    res.set('Content-Encoding', 'gzip')
    next()
  })
}

// Serve webpack build PRODUCTION
app.use(express.static('public'))
app.use(favicon('public/favicon.ico'))

// Enable handling of REST responses
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Authentication
app.post('/auth/login', AttemptLogin)
app.post('/auth/signup', AttemptSignup)

// Authentication Check for all api routes
app.use('/api', require('./validation/auth-check'))

// Note API
app.get('/api/notes', getNotes)
app.get('/api/notes/:id', getNote)
app.post('/api/notes', createNote)
app.put('/api/notes/:id', updateNote)
app.put('/api/notes/complete/:id', toggleCompletion)
app.delete('/api/notes/:id', removeNote)

// Planner API
app.get('/api/planner/getDueTasks', getDueTasks)
app.get('/api/planner/getOptimalTasks', getOptimalTasks)
app.get('/api/planner/setItemAsDue', setItemAsDue)

// Set port and listen.
app.set('port', (process.env.PORT || 3333))
app.listen(app.get('port'), () =>
  console.log('Server @', app.get('port')))
