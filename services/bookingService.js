const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

// AWS Configuration
const awsConfig = {
    region: 'ap-south-1',
    credentials: {
        accessKeyId: '---',
        secretAccessKey: '---'
    }
};

// Initialize DynamoDB client
const dynamoDBClient = new DynamoDBClient(awsConfig);
const dynamoDB = DynamoDBDocumentClient.from(dynamoDBClient);

// Function to create a booking
async function createBooking(req, res) {
    const { userId, movieId, seats } = req.body;
    const params = {
        TableName: 'BookingsTable', // DynamoDB table name
        Item: {
            userId,
            movieId,
            seats
        }
    };
    try {
        await dynamoDB.put(params).promise();
        res.status(201).json({ message: 'Booking created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create booking' });
    }
}

// Function to get a booking by booking ID
async function getBooking(req, res) {
    const { bookingId } = req.params;
    const params = {
        TableName: 'BookingsTable', // DynamoDB table name
        Key: {
            bookingId
        }
    };
    try {
        const booking = await dynamoDB.get(params).promise();
        if (!booking.Item) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking.Item);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to get booking' });
    }
}

// Export the functions
module.exports = { createBooking, getBooking };
