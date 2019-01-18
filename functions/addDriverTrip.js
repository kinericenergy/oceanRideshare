// connects composeDB with database
const { Client } = require('pg')

module.exports = async (driver_id, date, start_location, end_location, price, seat_amount, seat_taken) => {
  const client = new Client({
    connectionString: process.env.PG_URL
  })

  await client.connect()
  let makeTrip = `INSERT INTO
  trips(driver_id, date, start_location, end_location, price, seat_amount, seat_taken)
  VALUES($1, $2, $3, $4, $5, $6, $7)`;
  await client.query(makeTrip, [driver_id, date, start_location, end_location, price, seat_amount, seat_taken])
 // ending the database connection
  await client.end()
};
