const express= require('express');
// connect the database
require('./src/config/dbConfig');
const cookieParser = require('cookie-parser');
const router = require('./src/routers');

// setup express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// setup view engine
app.set('view engine','ejs');

// static files
app.use(express.static("public"));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/images', express.static(__dirname + 'public/images'));
app.use('/Javascript', express.static(__dirname + 'public/Javascript'));

// setup router

app.use(router);

//404 page
app.use((req,res)=>{
    res.status(404).render('responseLayout', { message: '404 not found', url: '/', urlText: 'back to home' });
})

// start server on port 3000
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Success! visit: http://localhost:${PORT}`);
})

