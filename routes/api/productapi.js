


const express = require('express');
const { isLoggedIn } = require('../../middleware');
const User = require('../../models/User');
const router = express.Router();  // mini application

router.post('/products/:productId/like', isLoggedIn , async(req,res)=>{
    try{
        let {productId} = req.params;
        let user = req.user;
        let isLiked = user.wishlist.includes(productId);
        // console.log(isLiked);
        if (isLiked) {
            await User.findByIdAndUpdate(user._id , {$pull: {wishlist : productId }});
            req.flash('success', 'Product Removed from wishlist');
        } else {
            await User.findByIdAndUpdate(user._id , {$addToSet: {wishlist : productId }})
            req.flash('success', 'Product added to wishlist');
        }
    }
    catch(e){
        res.status(500).render('error', {err : e.message})
    }

})

module.exports = router;










