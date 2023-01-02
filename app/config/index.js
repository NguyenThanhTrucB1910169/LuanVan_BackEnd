const mysql = require("mysql");
const config = {
  app: {
    port: process.env.PORT || 3001,
  },
  db: {
    sql: mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "nodemysql",
    }),
  },
};

module.exports = config;
