import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Find Your Place API',
    version: '1.0.0',
    description: 'API untuk mencari tempat wisata di Yogyakarta',
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'], // path ke file route
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec; 