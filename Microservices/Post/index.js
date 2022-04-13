//config
const port = process.env.POST_PORT ? process.env.POST_PORT : 8083;

require('./app-container').setup();

//app
const app = require('./app');

//server-startup
app.listen(port, () => console.log(`Posts Service is running on PORT: ${port}`));

