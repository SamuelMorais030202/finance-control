import { Router, Request, Response } from 'express';
import Validations from '../middlewares/Validations';
import LoginController from '../controllers/LoginController';

const loginRouter = Router();
const login = new LoginController();

loginRouter.post(
  '/login',
  Validations.validateLogin,
  (req : Request, res : Response) => login.login(req, res),
);

export default loginRouter;