// this code is not relevant to current table settings on database
// connect composeDB with database
const { Client } = require('pg')

module.exports = async (start_location, end_location) => {
  const client = new Client({
    connectionString: process.env.PG_URL
  })

  await client.connect()
  // check that id is valid (and that row exists)
  let getByID = `SELECT * FROM trips, users
    WHERE start_location = ($1) AND end_location = ($2) AND trips.driver_id = users.id`
  let res = await client.query(getByID, [start_location, end_location])
  // passengers of result when row exists
  console.log(res.rows[0]);
  //console.log(res.rows[0].reserved_by);
  // let newPassengers = res.rows[0].reserved_by
  //   ? `${res.rows[0].reserved_by},${passenger}` // equilvalently, res.reserved_by + ',' + passenger
  //   : passenger;

 // ending the database connection
  await client.end()
  return res.rows[0];
  //return res.rows
};
