// this code is not relevant to current table settings on database
// connect composeDB with database
const { Client } = require('pg')

module.exports = async (date) => {
  const client = new Client({
    connectionString: process.env.PG_URL
  })

  await client.connect()
  // check that id is valid (and that row exists)
  let getByID = `SELECT * FROM trips, users
    WHERE date = ($1) AND trips.driver_id = users.id`
  let res = await client.query(getByID, [date])
  // passengers of result when row exists
  console.log(res.rows[0]);

 // ending the database connection
  await client.end()
};
