const sql = require('mssql/msnodesqlv8');

const connectionString = "server=(localdb)\\MSSQLLocalDB;Database=FakeLook;Trusted_Connection=True;";

const poolPromise = new sql.ConnectionPool(connectionString)
    .connect()
    .then(pool => {
        console.log('Connected to Mssql');
        return pool;
    })
    .catch(err => console.log('Database connection faild!', err));

module.exports = {
    sql, poolPromise
}