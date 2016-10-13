var api = require('./queries')
var auth = require('./auth')
var bodyParser = require('body-parser')

module.exports = function connectApi (app) {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  // db queries
  app.get('/api/notes', api.getNotes)
  app.get('/api/notes/:id', api.getNote)
  app.post('/api/notes', api.createNote)
  app.put('/api/notes/:id', api.updateNote)
  app.delete('/api/notes/:id', api.removeNote)

  // security
  app.use('/api/auth', auth.checkAuth)

  // profile
  app.get('/api/profile', api.getProfile)
}
