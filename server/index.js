import express from 'express'
import bodyParser from 'body-parser'
import favicon from 'serve-favicon'
import {
  getNotes, getNote, createNote, updateNote, removeNote, toggleCompletion,
} from './queries/notes'
import attemptLogin from './auth/login'
import compression from 'compression'
import passport from 'passport'
import localSignupStrategy from './server/passport/local-signup'
import localLoginStrategy from './server/passport/local-login'
import jwtCheck from './server/auth/jwt'

const app = express()

// compression
app.use(compression())
if (process.env.NODE_ENV === "development") {
  require('dotenv').config()
} else {
  app.get('*.js', function (req, res, next) {
    req.url = req.url + '.gz'
    res.set('Content-Encoding', 'gzip')
    next()
  })
}

// passport authentication
app.use(passport.initialize())
passport.use('local-signup', localSignupStrategy)
passport.use('local-login', localLoginStrategy)

// enable api stuff
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// db queries
app.get('/api/notes', getNotes)
app.get('/api/notes/:id', getNote)
app.post('/api/notes', createNote)
app.put('/api/notes/:id', updateNote)
app.put('/api/notes/complete/:id', toggleCompletion)
app.delete('/api/notes/:id', removeNote)

// security
app.use('/api/auth/login', attemptLogin)
app.use('/api/auth/jwt', jwtCheck)

// enable static site
app.use(express.static('public'))
app.use(favicon('public/favicon.ico'))

// launch
app.set('port', (process.env.PORT || 3333))
app.listen(app.get('port'), () =>
  console.log('Aether server running at', app.get('port')))
