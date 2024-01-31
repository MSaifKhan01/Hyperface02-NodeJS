
const express = require('express');
const { courseModel } = require('../Models/course');
const { BaseModel } = require('../Models/BaseModel');
const CouresRouter = express.Router();

const {RoleBase}=require("../Middleware/Role")
// Get all courses
CouresRouter.get('/', async (req, res) => {
  try {
    const courses = await courseModel.find().populate('baseItem');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific course
CouresRouter.get('/:id', async (req, res) => {
  try {
    const course = await courseModel.findById(req.params.id).populate('baseItem');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new course
CouresRouter.post('/',RoleBase(["admin"]), async (req, res) => {

  
  try {
    const baseItemID= req.body.baseItem
    const baseItem = await BaseModel.findById(baseItemID);
    if(baseItem){
      const course = new courseModel({
        baseItem: req.body.baseItem,
        chapters: req.body.chapters
      });
      const newCourse = await course.save();
      res.status(201).json(newCourse);
  
    }else{
      return res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a course
CouresRouter.patch('/:id',RoleBase(["admin"]), async (req, res) => {
  try {
    const course = await courseModel.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    course.baseItem = req.body.baseItem || course.baseItem;
    course.chapters = req.body.chapters || course.chapters;
    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a course
CouresRouter.delete('/:id',RoleBase(["admin"]), async (req, res) => {
  try {
    const course = await courseModel.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
  
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = CouresRouter;
