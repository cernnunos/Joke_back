const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API joke',
      version: '1.0.0',
      description: 'API documentation for my Node.js application',
    },
  },
  apis: ["./routes/api/v1/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;