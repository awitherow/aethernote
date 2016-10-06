import express from 'express'
import bodyParser from 'body-parser'
import favicon from 'serve-favicon'
import connectApi from './api'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

connectApi(app)

app.use(express.static('public'))
app.use(favicon('public/favicon.ico'))

app.set('port', (process.env.PORT || 3333))

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'))
})
