import express from 'express';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import dotenv from 'dotenv';
import * as api from './queries';
import * as auth from './auth';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// db queries
app.get('/api/notes', api.getNotes);
app.get('/api/notes/:id', api.getNote);
app.post('/api/notes', api.createNote);
app.put('/api/notes/:id', api.updateNote);
app.delete('/api/notes/:id', api.removeNote);

// security
app.use('/api/auth/:username/:password', auth.checkAuth);

app.use(express.static('public'));
app.use(favicon('public/favicon.ico'));

app.set('port', (process.env.PORT || 3333));

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
