// controllers/UserController.js
const User = require('../models/userModels')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler")  ;

exports.registerUser = asyncHandler (async (req,res) => {
  const {username, password, email} = req.body ; 
  if(!username || !password || !email){
      res.status(400); 
      throw new Error("Provide all required info") ; 
  } ;
  const userAvailable = await User.findOne({email}) ; 
  if(userAvailable){
      res.status(400); 
      throw new Error("user already exist") ; 
  } ; 
  const hashPass = await bcrypt.hash(password, 10) ; 
  console.log(hashPass) ; 
  const user = await User.create({
      username, 
      password: hashPass,
      email
  }) ; 
  if(user){
      res.status(200).json({__id:user.id , email:user.email }) ; 
  } else{
      res.status(400); 
      throw new Error ("User is not valid ") ; 
  }

}) ; 


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Provide email and password");
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};