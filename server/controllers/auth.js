import User from '../models/user'
import { hashPassword, comparePassword  } from '../utils/auth';


export const register = async (req, res) => {
   try {
    const {name, email, password} = req.body

    // validation
    if(!name) return res.status(400).send("Name is required!")
    if(!password || password.length < 6) return res.status(400).send("Password is required and should be six characters long!")
    if(!email) return res.status(400).send("Email is required!")
   } catch (err) {
       console.log(err)
       return res.status(400).send('Error Try again.')
   }
}