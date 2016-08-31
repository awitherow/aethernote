import express from 'express';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import * as api from './queries';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/notes', api.getNotes);
app.get('/api/notes/:id', api.getNote);
app.post('/api/notes', api.createNote);
app.put('/api/notes/:id', api.updateNote);
app.delete('/api/notes/:id', api.removeNote);

app.use(express.static('public'));
app.use(favicon('public/favicon.ico'));

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
