//config
require('./app-container').setup();
const port = process.env.USER_PORT ? process.env.USER_PORT : 8085;


//app
const app = require('./app');

//swagger


//server-startup
app.listen(port, () => console.log(`Users Service is running on PORT: ${port}`));

