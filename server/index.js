import express from 'express';
import bodyParser from 'body-parser';
import * as api from './queries';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/entries', api.getEntries);
app.get('/api/entries/:id', api.getEntry);
app.post('/api/entries', api.createEntry);
app.put('/api/entries/:id', api.updateEntry);
app.delete('/api/entries/:id', api.removeEntry);

app.use(express.static('public'));

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
