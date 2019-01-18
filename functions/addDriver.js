// connect composeDB with database
const { Client } = require('pg')

module.exports = async (trip_id, driver_id) => {
  const client = new Client({
    connectionString: process.env.PG_URL
  })

  await client.connect()
  // check if trip_id is valid
  let getTripByID = `SELECT * FROM trips
    WHERE id = ($1)`
  let updateDriver = `UPDATE trips SET driver_id = ($1) WHERE id = ($2)`;
  // result of querying by ID
  let res = await client.query(getTripByID, [trip_id])
  // when result does not exist

  if (!res) {
    throw new Error(`Could not find ${id}`)
  }
  // passengers of result when row exists
  console.log(res.rows[0]);
  console.log(res.rows[0].driver_id);
  let newPassengers = res.rows[0].driver_id
    ? `${res.rows[0].driver_id},${driver_id}` // equilvalently, res.reserved_by + ',' + passenger
    : driver_id;

  await client.query(updateDriver, [newPassengers, trip_id])
 // ending the database connection
  await client.end()
};
