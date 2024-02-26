


const express = require('express');
const Review = require('../models/Review');
const Product = require('../models/Product');
const { validateReview , isLoggedIn } = require('../middleware');
const router = express.Router();  // mini application


// review route -
router.post('/products/:id/rating', isLoggedIn , validateReview, async(req,res)=>{
    try{

        let { rating , comment } = req.body;
        let { id } = req.params;
    
        const product = await Product.findById(id);
    
        //new review using class -
        const review = new Review({ rating , comment });

        // adding review id to product array 
        product.reviews.push(review);
    
        await review.save();
        await product.save();

        // adding flash message ->
        req.flash('success', 'Review Added Successfuly');
        res.redirect(`/products/${id}`)  // show 
    }
    catch(e){
        res.status(500).render('error', {err : e.message})
    }

})

module.exports = router;

















