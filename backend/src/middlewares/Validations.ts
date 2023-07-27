import { NextFunction, Request, Response } from 'express';
import IUser from '../Interfaces/User/User';
import { ILogin, NewEntity } from '../Interfaces/User/UserModel';

export default class Validations {
  private static phoneRegex = /^\(\d{2}\) \d{9}$/;
  private static emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private static passwordMinLength = 4;

  static validateLogin(req : Request, res : Response, next : NextFunction) : Response | void {
    const { email, password } = req.body as ILogin;

    if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

    if (!Validations.emailRegex.test(email) || password.length < Validations.passwordMinLength) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    next();
  }

  static validateCreateUser(req : Request, res : Response, next : NextFunction) : Response | void {
    const { email, fullName, password, phone } = req.body as NewEntity<IUser>

    if (!email || !fullName || ! password || !phone) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!Validations.emailRegex.test(email) || password.length < Validations.passwordMinLength) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    if (!Validations.phoneRegex.test(phone)) {
      return res.status(401).json({ message: 'Invalid phone' });
    }

    if (fullName.length < 6) {
      return res.status(401).json({ message: 'Invalid full name' });
    }

    next();
  }
}