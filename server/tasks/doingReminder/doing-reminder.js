import promiseLib from 'bluebird'
import pg from 'pg-promise'

const pgp = pg({ promiseLib })

pgp.pg.defaults.ssl = true
const db = pgp(process.env.DATABASE_URL)

function sendMail() {
  let GMAIL_USER = process.env.GMAIL_USER
  let GMAIL_PASS = process.env.GMAIL_PASS

  let titles = []
  getTasks('doing')
    .then(tasks => tasks.map(task => titles.push(task.title)))
    .then(() => {
      let nodemailer = require('nodemailer')
      let transporter =
        nodemailer.createTransport(`smtps://${GMAIL_USER}%40gmail.com:${GMAIL_PASS}@smtp.gmail.com`)

      transporter.sendMail({
        from: GMAIL_USER,
        to: process.env.PRIVATE_EMAIL,
        subject: 'Daily Reminder',
        text: `${titles.join('\n')}`,
      }, (error, info) => {
        if (error) return console.log(error)
        console.log('Message sent: ' + info.response)
      })
    }
  )
}

function getTasks(category) {
  return db.any('select * from entries WHERE category=${category}', {
    category,
  }).then(data => data).catch(err => console.log(err))
}

sendMail()
