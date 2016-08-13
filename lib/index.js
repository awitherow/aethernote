import express, { Router } from 'express';
import * as api from './queries';

const app = express();
const router = Router();

router.get('/api/entries', api.getEntries);
router.get('/api/entries/:id', api.getEntry);
router.post('/api/entries', api.createEntry);
router.put('/api/entries/:id', api.updateEntry);
router.delete('/api/entries/:id', api.removeEntry);

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});

app.use((err, req, res) => {
  res.status(err.status || 500)
  .json({
    status: 'error',
    message: err,
  });
});

export default {
  router,
};
