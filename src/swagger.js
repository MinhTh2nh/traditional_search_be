const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', // OpenAPI version
    info: {
      title: 'API of Fashion Store Website',
      version: '1.0.0',
      description: 'API for LogIn and Register.',
    },
  },
  // List of files to be processed by swagger-jsdoc
  apis: ['./src/routes/LogIn.js','./src/routes/Register.js','./src/routes/adminproduct.js']// Replace with the actual path to your route file
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
