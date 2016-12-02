import promiseLib from 'bluebird'
import pg from 'pg-promise'

const pgp = pg({ promiseLib })

if (process.env.NODE_ENV === "development") {
  require('dotenv').config()
}

pgp.pg.defaults.ssl = true
const db = pgp(process.env.DATABASE_URL)

function sendEmailReminder() {
  getTasks('doing')
    .map(task => console.log(task.title))
}

function getTasks(category) {
  return db.any('select * from entries WHERE category=${category}', {
    category,
  }).then(data => data).catch(err => console.log(err))
}

sendEmailReminder()
