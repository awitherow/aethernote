import express from 'express'
import bodyParser from 'body-parser'
import favicon from 'serve-favicon'
import { getNotes, getNote, createNote, updateNote, removeNote } from './queries/notes'
import * as auth from './queries/auth'

if (process.env.NODE_ENV === "development") {
  require('dotenv').config()
}

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// db queries
app.get('/api/notes', getNotes)
app.get('/api/notes/:id', getNote)
app.post('/api/notes', createNote)
app.put('/api/notes/:id', updateNote)
app.delete('/api/notes/:id', removeNote)

// security
app.use('/api/auth', auth.checkAuth)

app.use(express.static('public'))
app.use(favicon('public/favicon.ico'))

app.set('port', (process.env.PORT || 3333))

app.listen(app.get('port'), () =>
  console.log('Aether server running at', app.get('port')))
