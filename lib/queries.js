import promiseLib from 'bluebird';
import pg from 'pg-promise';

const pgp = pg({
  promiseLib,
});

pgp.pg.defaults.ssl = true;
const db = pgp(process.env.DATABASE_URL);

export const getEntries = (req, res, next) => {
  db.any('select * from entries')
  .then(data => {
    res.status(200)
    .json({
      status: 'success',
      data,
      message: 'Retrieved all tasks',
    });
  }).catch(err => next(err));
};

export const getEntry = (req, res, next) => {
  const {id} = req.params;
  db.one(`select * from entries where id = ${id}`)
  .then(data => {
    res.status(200)
    .json({
      status: 'success',
      data,
      message: 'Retrieved entry',
    });
  }).catch(err => next(err));
};

export const createEntry = (req, res, next) => {
  req.body.prio = parseInt(req.body.prio);
  db.none('insert into entries(content, prio)' +
      'values(${content}, ${prio})',
    req.body)
  .then(() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'Inserted one entry',
    });
  }).catch(err => next(err));
};

export const updateEntry = (req, res, next) => {
  const {content, prio, archived} = req.body;
  db.none(`update entries set content=${content}, prio=${prio}, archived=${archived}`)
  .then(() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'Updated entry',
    });
  }).catch(err => next(err));
};

export const removeEntry = (req, res, next) => {
  const id = parseInt(req.params.id);
  db.result(`delete from entries where id = ${id}`)
  .then(result => {
    res.status(200)
    .json({
      status: 'success',
      message: `Removed ${result.rowCount} entry`,
    });
  }).catch(err => next(err));
};
