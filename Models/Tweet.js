
const mongoose=require("mongoose");
const BaseItem=require("./BaseModel")

const user=require("./user")

const tweetSchema=new mongoose.Schema({
  baseItem:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"BaseItem"
  },
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }
});

const  tweetModel = mongoose.model('Tweet', tweetSchema);

module.exports={
    tweetModel
}
