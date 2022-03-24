//config
require("dotenv").config();
require('./app-container').setup();
const port = process.env.PORT ? process.env.PORT : 8082;


//app
const app = require('./app');

//swagger


//server-startup
app.listen(port, () => console.log(`Comments Service is running on PORT: ${port}`));

