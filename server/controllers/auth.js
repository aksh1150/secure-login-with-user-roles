import User from '../models/user'
import { hashPassword, comparePassword  } from '../utils/auth';


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
    }).save();

    console.log("Saved user", user)

   } catch (err) {
       console.log(err)
       return res.status(400).send('Error Try again.')
   }
}