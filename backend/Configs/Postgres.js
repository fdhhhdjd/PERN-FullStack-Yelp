const Pool = require("pg").Pool;
require("dotenv").config();
const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
} = process.env;
const pool = new Pool({
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  database: POSTGRES_DB,
});
pool.connect();
pool.query(`Select * from restaurants`, (err, res) => {
  if (!err) {
    console.log("Connect Pg-Postgres Success");
  } else {
    console.log(err.message);
  }
  // pool.end();
});
module.exports = pool;
