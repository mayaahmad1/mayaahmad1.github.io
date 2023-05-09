const { admin_email, admin_password } = require('../config/adminInfo');
const jwt = require('jsonwebtoken');
const Product = require('../model/productModel');
const User = require('../model/userModel');

const adminRouter = require('express').Router();

adminRouter.get('/', (req,res)=>{
  if(!req.isAdmin) return res.redirect('/admin_panel/login');
  res.render('admin', {
    isAdmin: req.isAdmin,
  });
});

adminRouter.get('/login', (req,res)=>{
  if(req.isAdmin) return res.redirect('/admin_panel');
  res.render('admin/login', {
    isAdmin: req.isAdmin,
  });
});

adminRouter.post('/login', (req,res)=>{
  try { 
    const { email, password } = req.body;
    if(email === admin_email && password === admin_password) {
      res.cookie('admin_token', jwt.sign({ name: "Admin", role: "Admin" }, 'this'), { maxAge: 1000 * 60 * 60 * 24 * 7 });
      return res.redirect('/admin_panel');
    }

    res.render('responseLayout', {
      message: 'Admin Email or Password is incorrect',
      url: '/admin_panel/login',
      urlText: 'Go to Login Page',
      isLogged: false
    });

  } catch(error) { 
    console.log(error)
  }
});

adminRouter.get('/users', async (req,res)=> {
  if(!req.isAdmin) return res.redirect('/admin_panel/login');
  const users = await User.find({}).exec();
  res.render('admin/users', {
    isAdmin: req.isAdmin,
    users: users,
  });
});



adminRouter.get('/products', async (req,res)=>{
  if(!req.isAdmin) return res.redirect('/admin_panel/login');
  const products = await Product.find({}).exec();
  console.log(products);
  res.render('admin/products', {
    isAdmin: req.isAdmin,
    products: products,
  });
});

adminRouter.get('/products/add', async (req,res)=>{
  if(!req.isAdmin) return res.redirect('/admin_panel/login');
  res.render('admin/products-add', {
    isAdmin: req.isAdmin
  });
});


adminRouter.post('/products/add', async (req,res)=>{
  try { 
    const { name, price, description, image } = req.body;
    const product = new Product({
      name,
      price,
      description
    });
    await product.save();
    res.render('responseLayout', {
      message: 'Product added successfully',
      url: '/admin_panel/products',
      urlText: 'Go to Products Page',
      isLogged: true
    });
  } catch(error) { 
    console.log(error)
  }
});

adminRouter.get('/products/delete/:id', async (req,res)=>{
  try { 
    const id = req.params.id || null;
    const deleteRes = await Product.deleteOne({ _id: id });
    res.render('responseLayout', {
      message: 'Product deleted successfully',
      url: '/admin_panel/products',
      urlText: 'Go to Products Page',
      isLogged: true
    });
  } catch(error) { 
    console.log(error)
  }
});

module.exports = adminRouter;