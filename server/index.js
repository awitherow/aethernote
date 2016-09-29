import express from 'express';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';

import dbServer from 'synceddb-server';
import pgPersistence from 'synceddb-persistence-postgres';


pgPersistence.create({
  conString: process.env.DATABASE_URL,
  ssl: true,
}).then(p => {
  new dbServer({
    port: 8080,
    store: p,
  });
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(favicon('public/favicon.ico'));

app.set('port', (process.env.PORT || 3333));

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
