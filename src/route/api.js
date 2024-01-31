import express from "express";
import userController from "../controller/user-controller.js";
import CostumertController from "../controller/Costumert-controller.js";
import {authMiddleware} from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/logout', userController.logout);

// Costumert API
userRouter.post('/api/Costumerts', CostumertController.create);
userRouter.get('/api/Costumerts/:CostumertId', CostumertController.get);
userRouter.put('/api/Costumerts/:CostumertId', CostumertController.update);
userRouter.delete('/api/Costumerts/:CostumertId', CostumertController.remove);
userRouter.get('/api/Costumerts', CostumertController.search);

export {
    userRouter
}
