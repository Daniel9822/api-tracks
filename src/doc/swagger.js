const swaggerJs = require("swagger-jsdoc");
const { track, storage, authRegister, authLogin } = require("./schemas");

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Mi primera documentacion",
        version: "1.0.1",
    },
    servers: [
        {
            url: "http://localhost:3001/api",
        },
    ],
    components: {
        securitySchemes: {
            BearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        },
        schemas: {
            track,
            storage,
            authRegister,
            authLogin,
        },
    },
};

const path = `${__dirname}/../routes`

const options = {
    swaggerDefinition,
    apis: [`${path}/*.js`],
};

const openApiConf = swaggerJs(options);

module.exports = openApiConf;
