import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

export const signin = async(req,res) => {
    const {email,password} = req.body;

    try {
        const existingUser = await User.findOne({email})
        
        if(!existingUser){
            return res.status(404).json({message:"User doesn't exist."})
        }

        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)

        if(!isPasswordCorrect){
            return res.status(404).json({message:"Invalid credentials."})
        }

        const token = jwt.sign({email:existingUser.email, id:existingUser._id},'test',{expiresIn:'1h'});
        res.status(200).json({result:existingUser,token})

    } catch (error) {
        return res.status(500).json({message:"Something went wrong."})
    }
}

export const signup = async(req,res) => {
    const { email, password, firstName, lastName } = req.body;

  try {
    
    const oldUser = await User.findOne({ email });
    console.log(oldUser)
    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("op")
    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
    console.log(result)
    const token = jwt.sign( { email: result.email, id: result._id }, 'test', { expiresIn: "1h" } );
    console.log(token)
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
}