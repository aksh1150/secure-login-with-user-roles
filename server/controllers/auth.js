import User from '../models/user'
import { hashPassword, comparePassword  } from '../utils/auth';


export const register = async (req, res) => {
   try {
    console.log(req.body)
   } catch (err) {
       console.log(err)
       return res.status(400).send('Error Try again.')
   }
}