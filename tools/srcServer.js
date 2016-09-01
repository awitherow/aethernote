import express from 'express';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import path from 'path';
import config from '../webpack.config';
import open from 'open';
import * as api from '../src/server/queries';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/notes', api.getNotes);
app.get('/api/notes/:id', api.getNote);
app.post('/api/notes', api.createNote);
app.put('/api/notes/:id', api.updateNote);
app.delete('/api/notes/:id', api.removeNote);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
