


const mongoose = require('mongoose');   //object
const passportLocalMongoose = require('passport-local-mongoose');


// Schema -
const userSchema = new mongoose.Schema({


   email:{
    type:String,
    trim:true,
    required:true
   },
   role:{
    type:String,
    trim:true,
    default: 'buyer'
   },
   gender:{
    type:String,
    trim:true,
    required:true
   },
   wishlist:[
      {
          type: mongoose.Schema.Types.ObjectId,   // Ye dusre ki Schema ki object is per jakaer essi type ki DB ko store krta h 
          ref: 'Product'
      }
  ],
   cart:[
      {
          type: mongoose.Schema.Types.ObjectId,   // Ye dusre ki Schema ki object is per jakaer essi type ki DB ko store krta h 
          ref: 'Product'
      }
  ],
})

userSchema.plugin(passportLocalMongoose);  // always apply on schema

let User = mongoose.model('User', userSchema);
module.exports = User;












