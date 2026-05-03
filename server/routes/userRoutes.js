import express from "express";
import { getUserById, LoginUser, registerUser } from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";


const userRouter = express.Router();


userRouter.post('/register',registerUser)
userRouter.post('/login', LoginUser)
userRouter.get('/data',protect, getUserById)



export default userRouter;