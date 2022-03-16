//config
require("dotenv").config();
const port = process.env.PORT ? process.env.PORT : 8080;

require('./app-container').setup();

//app
const app = require('./app');

//swagger


//server-startup
app.listen(port, () => console.log(`Server is running on PORT: ${port}`));


// PORT = 8080
// domain = "localhost"
// db_name = "FakeLook"
// SqlConnectionString = "server=(localdb)\\MSSQLLocalDB;Database=FakeLook;Trusted_Connection=True;"