const express = require('express');
const { MongoClient } = require('mongodb');
const movieRoute = require('./routes/movie');
const userRouter = require('./routes/user');
const reviewRouter = require('./routes/review');
const favoriteRouter = require('./routes/favorite');

const app = express();
const port = 8080;
const uri = 'mongodb+srv://hasithakalana100:hk_rajapaksha@cluster1.hlcjxub.mongodb.net/MovieDatabase?retryWrites=true&w=majority'

app.use(express.json());
app.use('/movies', movieRoute);
app.use('/users', userRouter);
app.use('/reviews', reviewRouter);
app.use('/favorites', favoriteRouter);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB Atlas');

    const db = client.db('MovieDatabase');
    const movieCollection = db.collection('movies');
    const usersCollection = db.collection('users');
    const reviewsCollection = db.collection('reviews');
    const favoritesCollection = db.collection('favorites');


    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Failed to connect to MongoDB Atlas:', error);
  });
