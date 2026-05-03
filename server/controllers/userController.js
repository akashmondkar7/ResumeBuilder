
import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



const generateToken = (id) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn: '7d'})
    return token;
}
//controller for user registration
//post: /api/users/register
export const registerUser = async (req, res) => {
   try {
    const {name,email,password} = req.body;
     //check if required fields are present
     if(!name || !email || !password){
        return res.status(400).json({message: "Missing required fields"})}
         const user = await User.findOne({email})
         if(user){
            return res.status(400).json({message: "User already exists"})
         }
        // create new user

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            name,email,password:hashedPassword

        })

        //return Sucess massage
        const token = generateToken(newUser._id)
        newUser.password = undefined;

        return res.status(201).json({message: "User created successfully",token,User:newUser})



        


   } catch (error) {

    return res.status(500).json({message: error.message})
    
   }
}

//controller for user login
//post: /api/users/login

export const LoginUser = async (req, res) => {
   try {
    const {email,password} = req.body;
     //check if user exist
     if( !email || !password){
         const user = await User.findOne({email})
         if(!user){
            return res.status(400).json({message: "Invalid user or password"})
         }
         
        }
        if(!user.comparePassword(password)){
            return res.status(400).json({message: "Invalid user or password"})

        }

        //return sucess massage
        // create new user

   

        //return Sucess massage
        const token = generateToken(user._id)
        user.password = undefined;

        return res.status(200).json({message: "login successfully",token,user})

   } catch (error) {

    return res.status(500).json({message: error.message})
    
   }
}

///controller for getting user by id
//GET: /api/user/data

export const getUserById = async (req, res) => {
   try {

     const userId = req.userId;
 
        // check if user exists

        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        // return user
        user.password = undefined;
        return res.status(200).json({user});
      
   } catch (error) {

    return res.status(400).json({message: error.message})
    
   }
}
  //controller for getting user resumes

  //GET: /api/user/resumes

  export const getUserResumess = async (req,res) => {

    try {
        
    } catch (error) {
        
    }
    
  }
