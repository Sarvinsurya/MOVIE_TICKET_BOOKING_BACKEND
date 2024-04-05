const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const awsConfig = {
    region: 'ap-south-1',
    credentials: {
        accessKeyId: '---',
        secretAccessKey: '---'
    },

};

const dynamoDBClient = new DynamoDBClient(awsConfig);
const dynamoDB = DynamoDBDocumentClient.from(dynamoDBClient);

async function getAllMovies(req, res) {
    const params = {
        TableName: 'MoviesTable',
    };
    try {
        const movies = await dynamoDB.scan(params).promise();
        res.json(movies.Items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to get movies' });
    }
}

async function getMovie(req, res) {
    const { movieId } = req.params;
    const params = {
        TableName: 'MoviesTable',
        Key: {
            movieId
        }
    };
    try {
        const movie = await dynamoDB.get(params).promise();
        if (!movie.Item) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie.Item);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to get movie' });
    }
}

module.exports = { getAllMovies, getMovie };
