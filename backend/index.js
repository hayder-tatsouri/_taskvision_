require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { sequelize, DataTypes } = require('./models');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      
      title: 'Task Vision API',
      version: '1.0.0',
      description: 'API documentation for Task Vision project management tool'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ['./routes/*.js'], // Path to the API docs
};
const app = express();

const specs = swaggerJsDoc(options);

// Importer routes
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/task', taskRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/project', projectRoutes);
app.use('/comment', require('./routes/commentRoutes'));
//  Start server after DB sync
sequelize.sync() 
.then(() => {
  app.listen(3000, () => {
    console.log(" Server is running on http://localhost:3000");
  });
}).catch((err) => {
  console.error(" Database connection error:", err);
});
