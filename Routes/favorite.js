const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const router = express.Router();

const uri = 'mongodb+srv://hasithakalana100:hk_rajapaksha@cluster1.hlcjxub.mongodb.net/MovieDatabase?retryWrites=true&w=majority'

router.get('/favorites/read/', async (req, res) => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db('MovieDatabase');
    const favorites = await db.collection('favorites').find().toArray();
    res.json(favorites);
  } catch (error) {
    console.error('Failed to retrieve favorites:', error);
    res.sendStatus(500);
  } finally {
    await client.close();
  }
});

router.post('/favorites/create/', async (req, res) => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db('MovieDatabase');
    const result = await db.collection('favorites').insertOne(req.body);
    res.json(result.ops[0]);
  } catch (error) {
    console.error('Failed to insert favorite:', error);
    res.sendStatus(500);
  } finally {
    await client.close();
  }
});

router.delete('/favorites/delete/:id', async (req, res) => {
  const { id } = req.params;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db('MovieDatabase');
    const result = await db.collection('favorites').deleteOne({ _id: ObjectId(id) });
    if (result.deletedCount === 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(`Failed to delete favorite with id ${id}:`, error);
    res.sendStatus(500);
  } finally {
    await client.close();
  }
});

module.exports = router;

