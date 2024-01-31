
const express = require('express');
const { ArticleModel } = require('../Models/Article');
const { BaseModel } = require('../Models/BaseModel');
const ArticleRouter = express.Router();
const {RoleBase}=require("../Middleware/Role")

// Get all articles
ArticleRouter.get('/', async (req, res) => {
  try {
    const articles = await ArticleModel.find().populate('baseItem');
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific article
ArticleRouter.get('/:id', async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.id).populate('baseItem');
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new article
ArticleRouter.post('/',RoleBase(["admin"]), async (req, res) => {

  try {
   
  const baseItemID= req.body.baseItem
  const baseItem = await BaseModel.findById(baseItemID);

  if(baseItem){

    const article = new ArticleModel({
      baseItem: req.body.baseItem,
      chapters: req.body.chapters
    });

    const newArticle = await article.save();
    res.status(201).json(newArticle);

  }else{
    return res.status(404).json({ message: 'Item not found' });
  }

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an article
ArticleRouter.patch('/:id',RoleBase(["admin"]), async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    article.baseItem = req.body.baseItem || article.baseItem;
    article.chapters = req.body.chapters || article.chapters;
    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an article
ArticleRouter.delete('/:id',RoleBase(["admin"]), async (req, res) => {
  try {
    const article = await ArticleModel.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
  
    res.json({ message: 'Article deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = ArticleRouter;
