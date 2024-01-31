
const express = require('express');
const { tweetModel } = require('../Models/Tweet');
const {RoleBase}=require("../Middleware/Role")
const TweetRouter = express.Router();

// Get all tweets
TweetRouter.get('/', async (req, res) => {
  try {
    const tweets = await tweetModel.find().populate('baseItem').populate('author');
    res.json(tweets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific tweet
TweetRouter.get('/:id', async (req, res) => {
  try {
    const tweet = await tweetModel.findById(req.params.id).populate('baseItem').populate('author');
    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }
    res.json(tweet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new tweet
TweetRouter.post('/',RoleBase(["admin"]), async (req, res) => {

  try {

    
    const baseItemID= req.body.baseItem
    const baseItem = await BaseModel.findById(baseItemID);

    if(baseItem){

      const tweet = new tweetModel({
        baseItem: req.body.baseItem,
        author: req.body.author
      });
      const newTweet = await tweet.save();
    res.status(201).json(newTweet);
    }else{
      return res.status(404).json({ message: 'Item not found' });
    }

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a tweet
TweetRouter.patch('/:id',RoleBase(["admin"]), async (req, res) => {
  try {
    const tweet = await tweetModel.findById(req.params.id);
    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }
    tweet.baseItem = req.body.baseItem || tweet.baseItem;
    tweet.author = req.body.author || tweet.author;
    const updatedTweet = await tweet.save();
    res.json(updatedTweet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a tweet
TweetRouter.delete('/:id',RoleBase(["admin"]), async (req, res) => {
  try {
    const tweet = await tweetModel.findByIdAndDelete(req.params.id);
    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }
   
    res.json({ message: 'Tweet deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = TweetRouter;
