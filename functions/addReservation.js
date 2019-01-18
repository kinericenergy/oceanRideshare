// connect composeDB with database
const { Client } = require('pg')

module.exports = async (passenger, id) => {
  const client = new Client({
    connectionString: process.env.PG_URL
  })

  await client.connect()
  // check that id is valid (and that row exists)
  let getByID = `SELECT * FROM drivers
    WHERE id = ($1)`
  // append new passenger with existing passengers
  // update the reserved_by section with the new appended passengers
  let updateReservation = `UPDATE drivers SET reserved_by = ($1) WHERE id = ($2)`;
  // result of querying by ID
  let res = await client.query(getByID, [id])
  // when result does not exist

  if (!res) {
    throw new Error(`Could not find ${id}`)
  }
  // passengers of result when row exists
  console.log(res.rows[0]);
  console.log(res.rows[0].reserved_by);
  let newPassengers = res.rows[0].reserved_by
    ? `${res.rows[0].reserved_by},${passenger}` // equilvalently, res.reserved_by + ',' + passenger
    : passenger;

  await client.query(updateReservation, [newPassengers, id])
 // ending the database connection
  await client.end()
};
