const sql = require('mssql/msnodesqlv8');

const connectionString = process.env.SqlConnectionString;

const poolPromise = new sql.ConnectionPool(connectionString)
    .connect()
    .then(pool => {
        console.log('Connected to Mssql');
        return pool;
    })
    .catch(err => console.log('Database Connection Failed: ', err));

module.exports = { sql, poolPromise };