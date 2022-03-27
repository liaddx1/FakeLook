//config
const port = process.env.SERVER_PORT ? process.env.SERVER_PORT : 8080;

require('./app-container').setup();

//app
const app = require('./app');

//swagger

//server-startup
app.listen(port, () => console.log(`Server is running on PORT: ${port}`));

