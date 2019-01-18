// connect composeDB with database
const { Client } = require('pg')

module.exports = async () => {
  const client = new Client({
    connectionString: process.env.PG_URL
  })

  await client.connect()
  // check if trip_id is valid
  let getTripByID = `SELECT * FROM trips, users
    WHERE driver_id IS NOT NULL AND trips.driver_id = users.id`

  let res = await client.query(getTripByID)
  return client.end()
    .then(results => {
      return res.rows;
    })
    .catch(err => {
      console.log(err);
      return err;
    })
  // return res.rows
};


// lib.erickim.ocean2['@dev'].searchByRider()
