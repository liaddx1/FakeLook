//config
require('./app-container').setup();
const port = process.env.COMMENT_PORT ? process.env.COMMENT_PORT : 8082;


//app
const app = require('./app');

//swagger


//server-startup
app.listen(port, () => console.log(`Comments Service is running on PORT: ${port}`));

