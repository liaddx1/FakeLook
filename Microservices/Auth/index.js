//config
const port = process.env.AUTH_PORT ? process.env.AUTH_PORT : 8081;

require('./app-container').setup();

//app
const app = require('./app');

//server-startup
app.listen(port, () => console.log(`Auth Service is running on PORT: ${port}`));