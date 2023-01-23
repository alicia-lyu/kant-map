require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8080;

const express = require("express");
const app = express();

// packages
const cors = require("cors");
const path = require('path');
const session = require('express-session');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const methodOverride = require('method-override')

// middlewares
const secret = process.env.SECRET || 'foo';
const sessionConfig = {
  name: 'session',
  resave: false,
  saveUninitialized: true,
  secret,
};

const corsOptions = {
  origin: "http://localhost:" + port,
  credentials: true
};
app.use(session(sessionConfig))
app.use(cors(corsOptions));
app.use(favicon(path.join(__dirname, 'assets/favicon.ico')));
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// routes
const termRoutes = require('./routes/term.route')
const sentenceRoutes = require('./routes/sentence.route')
const authRoutes = require("./routes/auth.route")
const userRoutes = require("./routes/user.route")
app.use(authRoutes);
app.use(userRoutes);
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