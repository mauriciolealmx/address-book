import pg from 'pg';
import config from '../../config';

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/mleal';
const client = new pg.Client(connectionString);

client.connect();
const query = client.query(
  'CREATE TABLE users(id SERIAL PRIMARY KEY, email VARCHAR(50) not null, password CHARACTER(32) not null)'
);
query.on('end', () => { 
	console.log('Table created');
	client.end(); 
});