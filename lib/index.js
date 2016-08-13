import express from 'express';
import pg from 'pg';

const app = express();

app.set('port', (process.env.PORT || 5000));

pg.defaults.ssl = true;
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/dailyjs';

app.get('/', (req, res) => {
  pg.connect(connectionString, (err, client) => {
    if (err) throw err;
  });
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
