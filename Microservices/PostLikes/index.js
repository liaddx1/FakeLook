//config
require('./app-container').setup();
const port = process.env.POST_LIKES_PORT ? process.env.POST_LIKES_PORT : 8084;

//app
const app = require('./app');

//server-startup
app.listen(port, () => console.log(`PostLikes Service is running on PORT: ${port}`));

