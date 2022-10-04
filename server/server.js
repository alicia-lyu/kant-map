require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();

// packages
const cors = require("cors");
const path = require('path');
const session = require('express-session');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const methodOverride = require('method-override')
const flash = require('connect-flash');

// middlewares
const secret = process.env.SECRET || 'foo';
const sessionConfig = {
  name: 'session',
  resave: false,
  saveUninitialized: true,
  secret,
};
app.use(session(sessionConfig))
app.use(cors());
app.use(favicon(path.join(__dirname, 'assets/favicon.ico')));
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(flash());
app.use((req, res, next) => {
    console.log(req.session)
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

const port = process.env.PORT || 8080;

// routes
const termRoutes = require('./routes/term')
const sentenceRoutes = require('./routes/sentence')
app.use(termRoutes);
app.use(sentenceRoutes);
app.use((req, res) => {
  res.status(404).send('Not Found')
})

// database
const connectMongoose = require("./db/conn");
 
app.listen(port, () => {
  connectMongoose();
  console.log(`Server is running on port: ${port}.`);
})