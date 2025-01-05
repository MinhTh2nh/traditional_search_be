const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "www.db4free.net",
  user: "nghiango0810",
  password: "admin1234",
  database: "store_1",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL as id " + connection.threadId);
});

// Adding a query method to the connection object
connection.queryAsync = (sql, values) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};

module.exports = connection;
