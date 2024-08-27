import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        // Check if all fields are provided
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
        next(errorHandler(500, 'Server error during signup'));
    }
};
