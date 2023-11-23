const express = require('express');
const router = require('./application/index');
const bodyParser = require('body-parser');
const env = require("dotenv");
const bookRouter = require('./application/book-route');
const db = require('./db/db');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;
env.config();

db();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use('/', router);
app.use('/books', bookRouter);


app.listen(port, ()=>{console.log('Server is started')});