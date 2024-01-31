
const mongoose=require("mongoose");

const baseSchema=new mongoose.Schema({
  title: String,
  duration:String,
  link:String

});

const BaseModel= mongoose.model("BaseItem", baseSchema);
module.exports={
    BaseModel
}
