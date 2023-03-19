const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const User = require('../models/user');


const router = express.Router();
const uri = 'mongodb+srv://hasithakalana100:hk_rajapaksha@cluster1.hlcjxub.mongodb.net/MovieDatabase?retryWrites=true&w=majority'


router.get('/user/read/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await usersCollection.findOne({ _id: ObjectId(id) });
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(`Failed to retrieve user with id ${id}:`, error);
    res.status(500).send(`Failed to retrieve user with id ${id}: ${error}`);
  }
});

router.post('/user/create/', async (req, res) => {
  try {
    const result = await usersCollection.insertOne(req.body);
    res.json(result.ops[0]);
  } catch (error) {
    console.error('Failed to insert user:', error);
    res.status(500).send(`Failed to insert user: ${error}`);
  }
});

router.delete('/user/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await usersCollection.deleteOne({ _id: ObjectId(id) });
    if (result.deletedCount === 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(`Failed to delete user with id ${id}:`, error);
    res.status(500).send(`Failed to delete user with id ${id}: ${error}`);
  }
});

router.put('/user/update/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await usersCollection.updateOne({ _id: ObjectId(id) }, { $set: req.body });
    if (result.modifiedCount === 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(`Failed to update user with id ${id}:`, error);
    res.status(500).send(`Failed to update user with id ${id}: ${error}`);
  }
});

module.exports = router;