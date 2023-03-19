const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const router = express.Router();
const uri = 'mongodb+srv://hasithakalana100:hk_rajapaksha@cluster1.hlcjxub.mongodb.net/MovieDatabase?retryWrites=true&w=majority'

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db('MovieDatabase');
    const review = await db.collection('reviews').findOne({ _id: ObjectId(id) });
    if (review) {
      res.json(review);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(`Failed to retrieve review with id ${id}:`, error);
    res.sendStatus(500);
  } finally {
    await client.close();
  }
});

router.post('/', async (req, res) => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db('MovieDatabase');
    const result = await db.collection('reviews').insertOne(req.body);
    res.json(result.ops[0]);
  } catch (error) {
    console.error('Failed to insert review:', error);
    res.sendStatus(500);
  } finally {
    await client.close();
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db('MovieDatabase');
    const result = await db.collection('reviews').deleteOne({ _id: ObjectId(id) });
    if (result.deletedCount === 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(`Failed to delete review with id ${id}:`, error);
    res.sendStatus(500);
  } finally {
    await client.close();
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db('MovieDatabase');
    const result = await db.collection('reviews').updateOne({ _id: ObjectId(id) }, { $set: req.body });
    if (result.modifiedCount === 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(`Failed to update review with id ${id}:`, error);
    res.sendStatus(500);
  } finally {
    await client.close();
  }
});

module.exports = router;