const express = require("express");
const app = express();
// packages
const methodOverride = require('method-override')
const flash = require('connect-flash');
// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(flash());
app.use((req, res, next) => {
    console.log(req.session)
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

module.exports = app;