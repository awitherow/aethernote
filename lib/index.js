import express from 'express';
import pg from 'pg';

const app = express();

app.set('port', (process.env.PORT || 5000));

pg.defaults.ssl = true;
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/dailyjs';

app.get('/', (request, res) => {
  const start = new Date();
  pg.connect(connectionString, (err, client) => {
    if (err) throw err;
    console.log('Connected to postgres!');

    client.query('CREATE TABLE visits (date date)');

    client
      .query(`INSERT INTO visits(date) VALUES(${date})`)
      .query(`SELECT COUNT(date) AS count FROM visits WHERE date = ${date}`)
      .on('row', row => {
        console.log(JSON.stringify(row));
      });
  });
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
