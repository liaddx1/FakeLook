//config
require("dotenv").config();
const port = process.env.PORT ? process.env.PORT : 8081;

require('./app-container').setup();

//app
const app = require('./app');

//swagger


//server-startup
app.listen(port, () => console.log(`Auth Service is running on PORT: ${port}`));

