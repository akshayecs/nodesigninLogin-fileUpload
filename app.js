require('dotenv').config();
const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const routes = require('./routes/users.js');
const flash = require('connect-flash');
const session = require('express-session');
const multer = require("multer");

const app = express();
// const port = process.env.PORT || 4000;

// // DB Config
// const db = require('./config/keys').mongoURI;

//database connection

mongoose.connect(process.env.DB_URI,{
  useNewUrlParser:true,
  useUnifiedTopology:true,

})
const db = mongoose.connection;
db.on('error',(error) => {
  console.log(error);
})
db.once("open",() => {
  console.log("Connected to the Database");
})


// EJS
app.use(expressEjsLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);


// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes

app.use('/users', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));