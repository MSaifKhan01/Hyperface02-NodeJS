
const mongoose=require("mongoose");
const BaseItem=require("./BaseModel")

const courseSchema=new mongoose.Schema({
  baseItem:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"BaseItem"
  },
  chapters:Number
});

const courseModel= mongoose.model("Course",courseSchema);

module.exports ={
    courseModel
}
