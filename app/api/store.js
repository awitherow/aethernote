import syncedDb from 'synceddb-client';

const stores = {
  notes: [],
};

export const db = syncedDb.open({
  name: 'Aether',
  version: 1,
  stores,
  remote: process.env.DATABASE_URL,
});

db.sync('tasks', {continuously: true});
