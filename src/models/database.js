import { Client } from 'pg';

import config from '../../config';

const connectionString = process.env.DATABASE_URL || config.connectionString;
const client = new Client(connectionString);
client.connect();

const queryString =
  'CREATE TABLE other(id SERIAL PRIMARY KEY, email VARCHAR(50) not null, password CHARACTER(32) not null)';

client.query(queryString).then(() => {
  console.log('Table created');
  client.end();
});