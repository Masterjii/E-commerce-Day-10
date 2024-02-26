


const express = require('express');
const app = express();  
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');   //passport
const cartRoutes = require('./routes/cart');   //cart
const productApi = require('./routes/api/productapi');   // Specifically for API
const passport = require('passport');  //passport
const LocalStrategy = require('passport-local').Strategy;     //passport
const User = require('./models/User');   //passport


const dotenv = require('dotenv').config()  // dotenv file 


mongoose.set('strictQuery', true);

let url = 'mongodb+srv://MyShop:MyShop123@cluster0.taifmws.mongodb.net/MyShopretryWrites=true&w=majority';    

mongoose
.connect(url)   // MongoDB Atlas
.then(()=>{console.log("DB connected Successfuly")})
.catch((err)=>{console.log("error is:", err)})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname , 'views'))
app.use(express.static(path.join(__dirname, 'public')))    // Static files

app.use(express.urlencoded({extended:true}))  
app.use(methodOverride('_method'))


let configSesion = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    // Adding session expiry 7 days
    cookie:{
      httpOnly : true,
      expires : Date.now() + 7*24*60*60*1000 ,
      maxAge: 7*24*60*60*1000 ,
    }
};

// expess-session middleware -
app.use(session(configSesion));
app.use(flash());   // ese hamesha session ke bad hi likhte h

// passport ko always session ke bad hi use krte h

app.use(passport.initialize());  //passport
app.use(passport.session());     //passport
  
passport.serializeUser(User.serializeUser());   //passport
passport.deserializeUser(User.deserializeUser());   //passport

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

app.use( (req,res,next)=>{
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.get("/", (req,res) =>{
  res.render("home");
});

// using one time seedDB() after MongoDB Atal
// seedDB()   // Bar bar store ho jata h, if not commented



// Routes 
app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(productApi);

//  Connect env files 
app.listen(process.env.PORT , ()=>{
    console.log(`server is connected at port: ${process.env.PORT}`);
})















