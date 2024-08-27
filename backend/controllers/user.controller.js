import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        // Check if all fields are provided not include any spaces
        if (
            !username ||
            !email ||
            !password ||
            username === '' ||
            email === '' ||
            password === ''
          ) {
            next(errorHandler(400, 'All fields are required'));
          }

        // Check if the user already exists Through email
        const findUser = await User.findOne({ email });
        if (findUser) {
            return next(errorHandler(400, 'Email is already exists'));
        }

        // Validate password length password must be 8 character
        if (password.length < 8) {
            return next(errorHandler(400, 'Password must be at least 8 characters'));
        }

        // Hash the password
        const hashedPassword = bcryptjs.hashSync(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();
        res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
        console.log("error in signup function",error)
        next(errorHandler(500, 'Server error during signup'));
    }
};



export const signin = async (req, res, next) => {
    // Extract email and password from the request body
    const { email, password } = req.body;
  
    // Check if both email and password are provided and not empty
    if (!email || !password || email === '' || password === '') {
      // If any field is missing, pass an error to the next middleware
      return next(errorHandler(400, 'All fields are required'));
    }
  
    try {
      // Find a user in the database with the provided email
      const validUser = await User.findOne({ email });
      
      // If the user is not found, return an error indicating the user doesn't exist
      if (!validUser) {
        return next(errorHandler(404, 'User not found with this email'));
      }
  
      // Compare the provided password with the stored hashed password
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      
      // If the password doesn't match, return an error indicating the password is incorrect
      if (!validPassword) {
        return next(errorHandler(400, 'Invalid password'));
      }
  
      // Create a JWT token with the user's ID as the payload
      const token = jwt.sign(
        { id: validUser._id }, // Payload contains the user's ID
        process.env.JWT_SECRET  // Secret key from environment variables
      );
  
      // Destructure the validUser object to exclude the password from the response data
      const { password: pass, ...rest } = validUser._doc;
  
      // Send a response with a cookie containing the JWT token and the user data (excluding the password)
      res
        .status(200) // Set the HTTP status to 200 (OK)
        .cookie('access_token', token, { // Set a cookie named 'access_token' with the JWT token
          httpOnly: true, // Make the cookie accessible only by the web server (not JavaScript)
        })
        .json(rest); // Respond with the user data (excluding the password)
  
    } catch (error) {
      // If an error occurs during the process, pass it to the next middleware
      console.log("error in the signin function",error)
      next(error);
    }
  };
  


  export const signout = (req, res, next) => {

    try {
      res.clearCookie('access_token').status(200).json('User has been signed out')
    } catch (error) {
      next(error);
    }
   
  };