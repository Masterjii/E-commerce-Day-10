


const mongoose = require('mongoose');   //object


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,   
        required:true
    },
    img:{
        type:String,
        trim:true,
        required:true
    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    istock:{
        type:Boolean,
        default:true,
    },
    desc:{
        type:String,
        trim:true
    },
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,   // Ye dusre ki Schema ki object is per jakaer essi type ki DB ko store krta h 
            ref: 'Review'
        }
    ],
    author:{
        type: mongoose.Schema.Types.ObjectId,   // Ye dusre ki Schema ki object is per jakaer essi type ki DB ko store krta h 
        ref: 'User'
    }
})


// Syntex ->
// const modelName = mongoose.model(modelName, schema)

let Product = mongoose.model('Product', productSchema);

module.exports = Product;











