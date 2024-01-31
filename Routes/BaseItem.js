const express = require('express');
const { BaseModel } = require('../Models/BaseModel');

const {RoleBase}=require("../Middleware/Role")
const BaseItemRouter = express.Router();

// Get all base items
BaseItemRouter.get('/', async (req, res) => {
  try {
    const baseItems = await BaseModel.find();
    res.json(baseItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific base item by ID
BaseItemRouter.get('/:id', async (req, res) => {
  try {
    const baseItem = await BaseModel.findById(req.params.id);
    if (!baseItem) {
      return res.status(404).json({ message: 'Base item not found' });
    }
    res.json(baseItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new base item
BaseItemRouter.post('/',RoleBase(["admin"]), async (req, res) => {
  
  try {
    const baseItemID= req.body.baseItem
  const baseItem = await BaseModel.findById(baseItemID);
  if(!baseItem){
    const baseItem = new BaseModel({
      title: req.body.title,
      duration: req.body.duration,
      link:req.body.link
    });

    const newBaseItem = await baseItem.save();
    res.status(201).json(newBaseItem);

  }else{
      return res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a base item
BaseItemRouter.patch('/:id',RoleBase(["admin"]), async (req, res) => {
  try {
    const baseItem = await BaseModel.findById(req.params.id);
    if (!baseItem) {
      return res.status(404).json({ message: 'Base item not found' });
    }
    baseItem.title = req.body.title || baseItem.title;
    baseItem.duration = req.body.duration || baseItem.duration;
    const updatedBaseItem = await baseItem.save();
    res.json(updatedBaseItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a base item
BaseItemRouter.delete('/:id',RoleBase(["admin"]), async (req, res) => {
  try {
    const baseItem = await BaseModel.findByIdAndDelete(req.params.id);
    if (!baseItem) {
      return res.status(404).json({ message: 'Base item not found' });
    }
   
    res.json({ message: 'Base item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = BaseItemRouter;
