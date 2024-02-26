


const Product = require('./models/Product');
const {productSchema , reviewSchema} = require('./schema');


const validateProduct = (req,res,next) =>{
    try{
        let {name, img, price, desc} = req.body;
        const{error} = productSchema.validate({name, img, price, desc})
        if(error){
            const msg = error.details.map((err)=>err.message).join(',');
            return res.render('error', {err:msg})
        }
        next();
    }
    catch(e){
        console.error("Error in validateProduct middleware:", e);
        res.status(500).render('error', {err : e.message});
    }
    }

const validateReview = (req,res,next) =>{
    try{

        let {rating, comment} = req.body;
        const{error} = reviewSchema.validate({rating, comment})
        if(error){
            const msg = error.details.map((err)=>err.message).join(',');
            return res.render('error', {err:msg})
        }
        next();
    }
    catch(e){
        console.error("Error in validateReview middleware:", e);
        res.status(500).render('error', {err : e.message});
    }
}

const isLoggedIn = (req,res,next) =>{
try{
    if (req.xhr && !req.isAuthenticated()) {
        return res.render({msg: 'You need to login first'});
        // console.log(req.xhr);  // ajax hai ya nhi ?
    };

    if (!req.isAuthenticated()) {
        req.flash('error', 'You need to first login');
        return res.redirect('/login');
    } 
    next();
}
catch(e){
    console.error("Error in isLoggedIn middleware:", e);
    res.status(500).render('error', {err : e.message});
}
}

const isSeller = (req,res,next) =>{
    try{
        let {id} = req.params;
        if(!req.user.role){
            req.flash('error', 'You do not have permissions');
            return res.redirect('/products');
        } 
        else if(req.user.role !== "seller"){
            req.flash('error', 'You do not have permissions');
            return res.redirect(`/products/${id}`);
        }
        next();
    }
    catch(e){
        console.error("Error in isSeller middleware:", e);
        res.status(500).render('error', {err : e.message});
    }
}


const isProductAuthor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        
        if (!product) {
            req.flash('error', 'Product not found');
            return res.redirect('/products');
        }

        if (!product.author) {
            req.flash('error', 'Product author not found');
            return res.redirect(`/products/${id}`);
        }

        if (!product.author.equals(req.user._id)) {
            req.flash('error', 'You are not the owner of this product');
            return res.redirect(`/products/${id}`);
        }

        next();
    } catch (err) {
        console.error("Error in isProductAuthor middleware:", err);
        req.flash('error', 'Error occurred while checking product author');
        return res.redirect(`/products/${id}`);
    }
}


module.exports = {validateProduct, validateReview, isLoggedIn, isSeller, isProductAuthor};















