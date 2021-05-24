import User from '../models/user'
import { hashPassword, comparePassword  } from '../utils/auth';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
   try {
    const {name, email, password} = req.body

    // validation
    if(!name) return res.status(400).send("Name is required!")
    if(!password || password.length < 6) return res.status(400).send("Password is required and should be six characters long!")
    if(!email) return res.status(400).send("Email is required!")
    

    // Check if user exists
    let userExist = await User.findOne({email}).exec();
    if(userExist) return res.status(400).send("Email is taken.")


    // hash password
    const hashedPassword = await hashPassword(password)


    // register
    const user = new User({
        name,
        email,
        password: hashedPassword
    });
    await user.save();
    return res.json({ ok: true });

   } catch (err) {
       console.log(err)
       return res.status(400).send('Error Try again.')
   }
}


export const login = async (req, res) => {
    try {
        const {email, password} = req.body

        // check if our db has user with that password
        const user = await User.findOne({email}).exec()
        if(!user) return res.status(400).send("User not found!");

        // check password
        const match = await comparePassword(password, user.password)
        if(!match) return res.status(400).send("Password not match!")

        // create JWT
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        // return user and token to client, not send hashed password
        user.password = undefined;

        // send token to client in cookie
        // NOTE: not send token as a response object like res.json({token: token})
        // Send it by cookie
        res.cookie('token', token, {
            httpOnly: true,
           // secure: true, // only works with https
        });

        // send user as json response
        res.json(user);


    } catch (err) {
        console.log(err)
        return res.status(400).send("Error, Try again!");
    }
}



// Logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.json({message: "Signout Success!"})
    } catch (err) {
        console.log(err)
    }
}


// Current USer

export const currentUser = async (req, res) => {
    try {
        // get user but not send password to frontend so deselect password using -password
        const user = await User.findById(req.user._id).select('-password').exec();
    } catch (err) {

    }
}