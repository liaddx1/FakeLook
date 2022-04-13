//config
const port = process.env.SERVER_PORT ? process.env.SERVER_PORT : 8080;

require('./app-container').setup();

//app
const app = require('./app');

//swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'FakeLook Server API',
            version: "1.0.0",
            description: 'FakeLook Server API\'s Information'
        },
        contact: {
            name: 'Liad Dadon'
        },
        servers: [
            {
                url: "http://localhost:8080"
            }
        ],
    },
    apis: ['./Server/routes/*.js']
}

const swaggerDocs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//server-startup
app.listen(port, () => console.log(`Server is running on PORT: ${port}`));