// connect composeDB with database
const { Client } = require('pg')

module.exports = async () => {
  const client = new Client({
    connectionString: process.env.PG_URL
  })
  await client.connect()
  // check if trip_id is valid
  let getTripByID = `SELECT * FROM trips
    WHERE driver_id IS NULL AND rider_id IS NOT NULL`

  let res = await client.query(getTripByID)

  // console.log(res.rows);
  await client.end()
  return res.rows
};
