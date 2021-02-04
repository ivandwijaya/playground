const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const { Client } = require('pg');

let client
try {
  // client = new Client({
  //   connectionString: process.env.DATABASE_URL,
  //   ssl: {
  //     rejectUnauthorized: false
  //   }
  // });

  // client.connect();
}
catch(err) {}

const app = express();
app.get('/', (req, res) => {
  if (client) {
    client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
      if (err) throw err;
      for (let row of res.rows) {
        res.send(JSON.stringify(row))
      }
      client.end();
    });
  }
  else {
    res.send('INDEXES')
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started on port ${PORT}`))
