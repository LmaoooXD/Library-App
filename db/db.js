const {default: mongoose, mongo} = require("mongoose");
require('dotenv').config;



const connectDB = async () => {
    var connectString = process.env.MONGO_URI;
    try {
      await mongoose.connect(connectString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.log('Error connecting to MongoDB:', error);
    }
  };
  
  const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  });
  
  const User = mongoose.model('User', userSchema);
  

  module.exports = User;
  module.exports = connectDB;