import axios from 'axios';
import db from '../../db';
import { doingReminder } from './templates';

if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

async function sendMail() {
    let GMAIL_USER = process.env.GMAIL_USER;
    let GMAIL_PASS = process.env.GMAIL_PASS;
    let PRIVATE_EMAIL = process.env.PRIVATE_EMAIL;

    const quote = await getQuotes();
    const tasks = await getThingsByCategory('doing');
    const affirmations = await getThingsByCategory('affirmation');
    const goals = await getThingsByCategory('aspirations').filter(goal =>
    new Date(goal.created).setHours(0, 0, 0, 0) ===
    new Date(new Date() - (1000*60*60*24)).setHours(0, 0, 0, 0)
  );

    let nodemailer = require('nodemailer');
    let transporter = nodemailer.createTransport(
    `smtps://${GMAIL_USER}%40gmail.com:${GMAIL_PASS}@smtp.gmail.com`
  );

    transporter.sendMail({
        from: GMAIL_USER,
        to: PRIVATE_EMAIL,
        subject: 'Daily Reminder',
        html: doingReminder(quote.data, tasks, goals, affirmations),
    }, (error, info) => {
        if (error) return console.log(error);
        console.log('Message sent: ' + info.response);
    });
}

function getThingsByCategory(category) {
    return db.any('select * from entries WHERE category=${category}', {
        category,
    }).catch(err => console.log(err));
}

function getQuotes() {
    return axios({
        method: 'get',
        url: 'http://api.forismatic.com/api/1.0/',
        params: {
            method: 'getQuote',
            format: 'json',
            lang: 'en',
        },
    });
}

sendMail();
