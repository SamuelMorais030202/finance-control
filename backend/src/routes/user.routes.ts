import { Request, Response, Router } from 'express';
import Authorized from '../middlewares/Authorized';
import UserController from '../controllers/UserController';
import Validations from '../middlewares/Validations';

const userRouter = Router();
const userController = new UserController();

userRouter.post(
  '/',
  Validations.validateCreateUser,
  (req : Request, res : Response) => userController.createUser(req, res),
);

userRouter.put(
  '/',
  Authorized,
  Validations.validateCreateUser,
  (req: Request, res : Response) => userController.updateUser(req, res),
);

userRouter.delete(
  '/',
  Authorized,
  (req : Request, res : Response) => userController.deleteUser(req, res),
);

export default userRouter;