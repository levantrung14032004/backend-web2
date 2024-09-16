import database from "mysql2/promise";

const connection = database.createPool({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "0108",
  database: "myweb",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export default connection;
