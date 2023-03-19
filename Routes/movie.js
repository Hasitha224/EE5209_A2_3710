const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const Movie = require('../models/movie');

const router = express.Router();

const uri = 'mongodb+srv://hasithakalana100:hk_rajapaksha@cluster1.hlcjxub.mongodb.net/MovieDatabase?retryWrites=true&w=majority'


router.get('/movie/read/:id', async (req, res) => {
  const { id } = req.params;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db('MovieDatabase');
    const movie = await db.collection('movies').findOne({ _id: ObjectId(id) });
    if (movie) {
      res.json(movie);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(`Failed to retrieve movie with id ${id}:`, error);
    res.sendStatus(500);
  } finally {
    await client.close();
  }
});

router.post('/movie/create/', async (req, res) => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db('MovieDatabase');
    const newMovie = new Movie(req.body);
    const result = await db.collection('movies').insertOne(newMovie);
    res.json(result.ops[0]);
  } catch (error) {
    console.error('Failed to insert movie:', error);
    res.sendStatus(500);
  } finally {
    await client.close();
  }
});


router.delete('/movie/delete/:id', async (req, res) => {
  const { id } = req.params;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db('MovieDatabase');
    const result = await db.collection('movies').deleteOne({ _id: ObjectId(id) });
    if (result.deletedCount === 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(`Failed to delete movie with id ${id}:`, error);
    res.sendStatus(500);
  } finally {
    await client.close();
  }
});

router.put('/movie/update/:id', async (req, res) => {
    const { id } = req.params;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db('MovieDatabase');
      const result = await db.collection('movies').updateOne({ _id: ObjectId(id) }, { $set: req.body });
      if (result.modifiedCount === 1) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error(`Failed to update movie with id ${id}:`, error);
      res.sendStatus(500);
    } finally {
      await client.close();
    }
});
  

module.exports = router;