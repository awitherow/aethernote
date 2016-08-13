import express from 'express'
import db from './queries'

const app = express()
const router = express.Router()

router.get('/api/entries', db.getEntries)
router.get('/api/entries/:id', db.getEntry)
router.post('/api/entries', db.createEntry)
router.put('/api/entries/:id', db.updateEntry)
router.delete('/api/entries/:id', db.removeEntry)

app.set('port', (process.env.PORT || 5000))

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'))
})

export default {
  router,
}
