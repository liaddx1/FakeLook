//config
require('./app-container').setup();
const port = process.env.POST_PORT ? process.env.POST_PORT : 8083;


//app
const app = require('./app');

//swagger


//server-startup
app.listen(port, () => console.log(`Posts Service is running on PORT: ${port}`));

