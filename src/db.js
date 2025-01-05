const mysql = require('mysql');


const db = mysql.createConnection({
    host:"db4free.net",
    user: "nghiango0810",
    password:"admin1234",
    database:"store_1",
}
);

db.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL_Database:', err);
      return;
    }
    console.log('Connected to MySQL_Database');
  });

  module.exports = db;
