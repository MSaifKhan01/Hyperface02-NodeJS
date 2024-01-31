

const mongoose=require("mongoose");
const BaseItem=require("./BaseModel")

const articleSchema=new mongoose.Schema({
  baseItem:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"BaseItem"
  },
  chapters:Number
});

const ArticleModel = mongoose.model('Article', articleSchema);
module.exports={
    ArticleModel
}