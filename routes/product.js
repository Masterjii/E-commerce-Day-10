


const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const { validateProduct , isLoggedIn, isSeller, isProductAuthor } = require('../middleware');
const router = express.Router();  // mini application


// Read - Display all the Products 
router.get('/products' , async (req, res)=>{
    try{
        let products = await Product.find({});
        res.render('index', {products})
    }
    catch(e){
        res.status(500).render('error', {err : e.message})
    }
});

// new form - adding a form for a new product -
router.get('/products/new', isLoggedIn , isSeller, (req, res)=>{
  try{
    res.render('new')
  }
  catch(e){
    res.status(500).render('error', {err : e.message});
}
});

// Actually Adding a product in DB
router.post('/products', isLoggedIn , isSeller, validateProduct, async (req,res)=>{     // By default undefined
    try{
        let {name, img, price, desc} = req.body;
        await Product.create({name, img, price, desc, author:req.user._id});  // Ye create krne ke baad Automatically DB mein save bhi kr deta h
        req.flash('success', 'Product Added Successfully');
        res.redirect('/products')
    }
    catch(e){
        res.status(500).render('error', {err : e.message});
    }
})

// route for showing the details of the product 
router.get('/products/:id' ,  isLoggedIn , async(req,res) =>{
    try{
        let {id} = req.params;
        let foundProduct = await Product.findById(id).populate('reviews');
        // console.log(foundProduct);
        res.render('show', {foundProduct, msg:req.flash('msg')});
    }
    catch(e){
        res.status(500).render('error', {err : e.message});
    }
})

// route for editing the product so we need form for it -
router.get('/products/:id/edit',  isLoggedIn , isSeller, async(req,res) =>{
    try{
        let {id} = req.params;
        // let foundProduct = await Product.findById(id);
        let foundProduct = await Product.findById(id);
        res.render('edit' , {foundProduct});
    }
    catch(e){
        res.status(500).render('error', {err : e.message});
    }
})

// changing the original edits in the database made in the editform  -
router.patch('/products/:id', isLoggedIn , isSeller, validateProduct, isProductAuthor, async(req,res)=>{
    try{
        let {id} = req.params;
        let {name, img, price, desc} = req.body;
        await Product.findByIdAndUpdate(id, {name, img, price, desc} );
        req.flash('success', 'Product Edit successfully');
        res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error', {err : e.message});
    }
})

// Deleting -
router.delete('/products/:id', isLoggedIn , isSeller, isProductAuthor, async(req,res)=>{
    try{
        let {id} = req.params;
        let foundProduct = await Product.findById(id);
    
        // Deleting reviews before deleting product 
        for(let ids of foundProduct.reviews){
            await Review.findByIdAndDelete(ids);
        }
        await Product.findByIdAndDelete(id);
        req.flash('success', 'Product Deleted successfuly');
        res.redirect('/products')
    }
    catch(e){
        res.status(500).render('error', {err : e.message})
    }
})

module.exports = router;

















