const express = require('express');
const collection = require('../db/db');
const User = require('../db/db');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectDB = require('../db/db');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const router = express.Router();
const app = express();

router.get('/',(req,res)=>{
    res.render('home');
});

router.get('/sign-up',(req,res)=>{
    res.render('sign-up');
});

router.get('/menu',(req,res)=>{
    res.render('menu');
});

router.post('/', (req, res) => {
    const { email, password } = req.body;
  
    User.findOne({ email }, (err, user) => {
      if (err) {
        console.log(err);
        res.send('An error occurred.');
      } else if (!user) {
        res.send('User not found.');
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            console.log(err);
            res.send('An error occurred.');
          } else if (result === true) {
            res.send('Login successful!');
          } else {
            res.send('Incorrect password.');
          }
        });
      }
    });
  });

  router.post('/sign-up', (req, res) => {
    const { email, password } = req.body;
  
    User.findOne({ email }, (err, user) => {
      if (err) {
        console.log(err);
        res.send('An error occurred.');
      } else if (user) {
        res.send('User already exists.');
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            console.log(err);
            res.send('An error occurred.');
          } else {
            const newUser = new User({
              email,
              password: hash,
            });
  
            newUser.save((err) => {
              if (err) {
                console.log(err);
                res.send('An error occurred.');
              } else {
                res.send('Signup successful!');
              }
            });
          }
        });
      }
    });
  });

module.exports = router;