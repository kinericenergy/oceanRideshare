// connect composeDB with database
const { Client } = require('pg')


module.exports = async (name = 'world', context) => {
  const client = new Client({
    connectionString: process.env.PG_URL
  })
  await client.connect()
  // create Users Table
  let makeUsersTable = `CREATE TABLE IF NOT EXISTS users(
    id serial primary key,
    name text,
    email text,
    password text,
    credit_card integer,
    billing_address text,
    reviews text,
    slack_username text,
    image_link text)`;
    // create Trips Table
  let makeTripsTable = `CREATE TABLE IF NOT EXISTS trips(
    id serial primary key,
    rider_id text,
    driver_id integer references users(id),
    date timestamp,
    start_location text,
    end_location text,
    price money,
    seat_amount integer,
    seat_taken integer)`

  // queries to build database
  await client.query(makeUsersTable);
  // await client.query(addColQuery);
  await client.query(makeTripsTable);
  // await client.query(addColQuery2);
  // ending the database connection
  await client.end()
};
