const express = require("express");
const app = express();

// packages
const cors = require("cors");
const path = require('path');
const morgan = require('morgan');
const favicon = require('favicon');

// middlewares
app.use(favicon(path.join(__dirname, 'assets/favicon.ico')));
app.use(morgan('tiny'));

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/term"));


// database
const connectMongoose = require("./db/conn");
 
app.listen(port, async () => {
  // perform a database connection when server starts
  await connectMongoose();
  console.log(`Server is running on port: ${port}`);
});