const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const jwt = require('jsonwebtoken');

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

// Function to register a new user
async function registerUser(req, res) {
    const { username, email, password, address } = req.body; 
    const params = {
        TableName: 'UsersTable',
        Item: {
            username,
            email,
            password,
            address
        }
    };
    try {
        await dynamoDB.put(params).promise();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to register user' });
    }
}

// Function to authenticate and login a user
async function loginUser(req, res) {
    const { email, password } = req.body;
    const params = {
        TableName: 'UsersTable',
        Key: {
            email
        }
    };
    try {
        const user = await dynamoDB.get(params).promise();
        if (!user.Item || user.Item.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.Item._id }, 'secretKey', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to login' });
    }
}

module.exports = { registerUser, loginUser };
