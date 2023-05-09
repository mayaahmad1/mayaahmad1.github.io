const Cart = require('../model/cartModel');
const Checkout = require('../model/checkoutModel');
const Product = require('../model/productModel');
const ShippingAddress = require('../model/shippingAddressModel');
const User = require('../model/userModel');

const viewRouter = require('express').Router();

viewRouter.get('/', async (req,res)=>{ // localhost:3000/
  try { 
    const products = await Product.find({}).exec();
    res.render('ScholarKits', {
      isLogged: req.isLogged,
      products: products,
    });
  } catch(error) { 
    console.log(error)
  }
});


viewRouter.get('/ScholarKits.html', async (req,res)=>{ // localhost:3000/ScholarKits.html
  try { 
    const products = await Product.find({}).exec();
    res.render('ScholarKits', {
      isLogged: req.isLogged,
      products: products,
    });
  } catch(error) { 
    console.log(error)
  }
});

viewRouter.get('/products/add-to-cart/:id', async (req,res)=> { // localhost:3000/products/add-to-cart/:id
  const userData = req.decode_data;
  try { 
    const product = await Product.findById(req.params.id).exec();
    const cart = new Cart({
      user_id: userData.id,
      name: product.name,
      price: product.price
    });
    await cart.save();
    res.redirect('/cart.html');
  } catch(error) { 
    console.log(error)
  }
});

viewRouter.get('/signin_up.html', (req,res)=>{
  res.render('signin_up', {
    isLogged: req.isLogged,
  });
});

viewRouter.get('/signup.html', (req,res)=>{
  res.render('signup', {
    isLogged: req.isLogged,
  });
});

viewRouter.get('/about.html', (req,res)=>{
  res.render('about', {
    isLogged: req.isLogged,
  });
});

viewRouter.get('/cart.html', async (req,res)=>{
  try { 
    const userData = req.decode_data;
    const cartItems = await Cart.find({ user_id: userData.id });
    const totalPrice = cartItems.reduce((total, item) => {
      return total + item.price;
    }, 0);
    res.render('cart', {
      isLogged: req.isLogged,
      cartItems: cartItems,
      totalPrice: totalPrice,
    });
  } catch(error) { 
    console.log(error)
  }
});

viewRouter.get('/profile.html', async (req,res)=>{
  try { 
    const userData = req.decode_data;
    const user = await User.find({ _id: userData.id });
    const userShippingAddress = await ShippingAddress.find({ user_id: userData.id });
    console.log(userShippingAddress)
    res.render('profile', {
      isLogged: req.isLogged,
      user: user[0],
      userShippingAddress: userShippingAddress[0],
    });
  } catch(error) { 
    console.log(error)
  }
});

viewRouter.post('/profile/update', async (req,res)=>{
  try { 
    const userData = req.decode_data;
    const userEdit = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      subscription: req.body.subscription,
    }
    
    await User.findByIdAndUpdate(userData.id, {...userEdit} ).exec();

    const userShippingAddress = new ShippingAddress({
      user_id: userData.id,
      address: req.body.address,
      city: req.body.city,
      zip: req.body.zip,
    });
    const ship = await ShippingAddress.findOneAndUpdate({ user_id: userData.id }, {
      user_id: userData.id,
      address: req.body.address,
      city: req.body.city,
      zip: req.body.zip,
    }).exec();
    if(!ship){
      await userShippingAddress.save();
    }
    res.redirect('/profile.html');
  } catch(error) { 
    console.log(error)
  }
});

viewRouter.get('/cart/remove/:id', async (req,res)=>{
  try { 
    await Cart.findByIdAndDelete(req.params.id).exec();
    res.redirect('/cart.html');
  } catch(error) { 
    console.log(error)
  }
});

viewRouter.get('/checkout.html', async (req,res)=>{
  const userData = req.decode_data;
  try { 
    const cartItems = await Cart.find({ user_id: userData.id });
    const totalPrice = cartItems.reduce((total, item) => {
      return total + item.price;
    } , 0);
    if(cartItems.length == 0) {
      return res.render('responseLayout', {
        isLogged: req.isLogged,
        message: 'Your cart is empty',
        url: '/cart.html',
        urlText: 'Go to cart',
      });
    }

    res.render('checkout', {
      isLogged: req.isLogged,
      cartItems: cartItems,
      totalPrice: totalPrice,
    });
  } catch(error) { 
    console.log(error)
  }
});

viewRouter.post('/checkout', async (req,res)=> {
  try { 
    const items = await Cart.find({ user_id: req.decode_data.id }).exec();
    const total_price = items.reduce((total, item) => {
      return total + item.price;
    }, 0);

    const total_items = items.length;
    const checkout = new Checkout({
      user_id: req.decode_data.id,
      total_price: total_price,
      total_item: total_items,
      ...req.body,
      items: items,
    });
    await checkout.save();
    const userData = req.decode_data;
    Cart.deleteMany({ user_id: userData.id }).exec();
    res.render('responseLayout', {
      isLogged: req.isLogged,
      message: 'Your order has been placed',
      url: '/ScholarKits.html',
      urlText: 'Go to home',
    });
  } catch(error) { 
    console.log(error)
  }
});

viewRouter.get('/vieworders.html', async (req,res)=>{
  try { 
    const userData = req.decode_data;
    const orders = await Checkout.find({ user_id: userData.id }).exec();
    res.render('vieworders', {
      isLogged: req.isLogged,
      orders: orders,
    });
  } catch(error) { 
    console.log(error)
  }
});

viewRouter.get('/custom.html', async (req,res)=>{
  try { 
    const products = await Product.find({  }).exec();
    res.render('custom', {
      isLogged: req.isLogged,
      products: products,
    });
  } catch(error) { 
    console.log(error)
  }
});

module.exports = viewRouter;