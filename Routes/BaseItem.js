const express = require('express');
const { BaseModel } = require('../Models/BaseModel');
const multer = require("multer");
const fs = require("fs");
const {RoleBase}=require("../Middleware/Role");
const { s3 } = require('../DB/S3_config');
const BaseItemRouter = express.Router();
require("dotenv").config();

const upload = multer({ dest: "uploads/" });


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
BaseItemRouter.post('/',upload.single("file"),RoleBase(["admin"]), async (req, res) => {

  try {
    const { file } = req;

    // Reading the file from the local filesystem
    const fileContent = fs.readFileSync(file.path);
  
    // Specifying the parameters for S3 upload
    const params = {
      Bucket: process.env.S3bucketName,
      Key: `${file.originalname}`,
      Body: fileContent,
    };
  
    s3.upload(params, async (err, data) => {
      if (err) {
        console.error("Error uploading file to S3:", err);
        return res.status(500).send("Internal Server Error");
      } else {
        console.log("File uploaded successfully. S3 URL:", data.Location);
        const imageUrlS3 = data.Location;

        const baseItemID = req.body.baseItem;
        const baseItem = await BaseModel.findById(baseItemID);
        
        if (!baseItem) {
          const newBaseItem = new BaseModel({
            title: req.body.title,
            duration: req.body.duration,
            link: imageUrlS3,
          
          });
      
          await newBaseItem.save();
          return res.status(201).json(newBaseItem);
        } else {
          return res.status(404).json({ message: 'Item not found' });
        }
      }
    });
  } catch (err) {
   
    return res.status(400).json({ message: err.message });
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
