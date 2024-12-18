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
      url: 'https://findyourplace-backend-production.up.railway.app/',
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