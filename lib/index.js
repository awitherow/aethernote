import express from 'express';
const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', (request, res) => {
  res.send('hello');
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
