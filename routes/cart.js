

const express = require('express');
const { isLoggedIn } = require('../middleware');
const User = require('../models/User');
const Product = require('../models/Product');
const router = express.Router();  // mini application
const stripe = require('stripe')('sk_test_51OaJGeSJ1BMd42sh5XHX3bBC527sKhD2x3cgF9AKJCUPX4S2j828pLDUjZME2aEOJLLr5yby10EIEibqgWBR62OS00vrOvk6ff');


router.get('/user/cart' ,isLoggedIn,  async (req,res)=>{
    try{
        let userId = req.user._id;
        let user = await User.findById(userId).populate('cart');
        let totalAmount = user.cart.reduce((sum, curr)=> sum + curr.price, 0);
        console.log(totalAmount);

        res.render('cart/cart', {user, totalAmount});
    }
    catch(e){
        res.status(500).render('error', {err : e.message})
    }
});

// Cart route -
router.get('/checkout/:id', async (req, res) => {
  let userId = req.params.id;
  let user = await User.findById(userId).populate('cart');
  let totalAmount = user.cart.reduce((sum, curr)=> sum + curr.price, 0);
  console.log(totalAmount);
  const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'My Cart',
            },
            unit_amount: totalAmount*100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:4242/success',
      cancel_url: 'http://localhost:4242/cancel',
    });
  
  res.redirect(303, session.url);
  });

// Buy route -
// Route to handle the checkout process
router.post('/checkout/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const foundProduct = await Product.findById(productId);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: {
            name: foundProduct.name,
            images: [foundProduct.img],
          },
          unit_amount: foundProduct.price * 100, // in cents
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://example.com/success',
      cancel_url: 'http://example.com/cancel',
    });
    res.redirect(303, session.url);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


// cart  route -
router.post('/user/:productId/add', isLoggedIn, async (req,res)=>{
try{
   let {productId} = req.params;
   let userId = req.user._id;
   let user = await User.findById(userId);
//    console.log(user, "sam");
   let product = await Product.findById(productId);
   user.cart.push(product);
   await user.save();
   res.redirect('/user/cart');
}
catch(e){
    res.status(500).render('error', {err : e.message})
}

});  

// cart  remove route -
router.post('/user/cart/:productId/remove', isLoggedIn, async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    // Remove the product from the user's cart
    await User.findByIdAndUpdate(userId, { $pull: { cart: productId } });
    req.flash('success', 'Product Removed');


    res.redirect('/user/cart');
  } catch (error) {
    res.status(500).render('error', { err: error.message });
  }
});


module.exports = router;


































