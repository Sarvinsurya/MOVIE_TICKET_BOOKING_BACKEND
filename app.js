const express = require('express');
const bodyParser = require('body-parser');
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const userRoutes = require('./controllers/userController');
const movieRoutes = require('./controllers/movieController');
const bookingRoutes = require('./controllers/bookingController');

const app = express();
app.use(bodyParser.json());

// AWS Configuration
const awsConfig = {
    region: 'ap-south-1',
    credentials: {
        accessKeyId: '---',
        secretAccessKey: '---'
    }
};

const dynamoDBClient = new DynamoDBClient(awsConfig);
const dynamoDB = DynamoDBDocumentClient.from(dynamoDBClient);

// Middleware to attach DynamoDB client to request object
app.use((req, res, next) => {
  req.dynamoDB = dynamoDB;
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/bookings', bookingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const port = 5555;
app.listen(port, () => console.log(`Server running on port ${port}`));
