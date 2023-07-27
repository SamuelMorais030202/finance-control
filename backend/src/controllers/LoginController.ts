import { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import JwtUtils from '../utils/JwtUtils';
import { ILogin } from '../Interfaces/User/UserModel';

export default class LoginController {
  private jwtUtils = new JwtUtils();
  private model : UserModel = new UserModel();

  async login(req : Request, res : Response) {
    const { email, password } = req.body as ILogin;
    const user = await this.model.findByEmail(email);

    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = this.jwtUtils.sign({ id: user.id });

    return res.status(200).json({
      token,
    });
  }

  // async loginRole(_req : Request, res : Response) {
  //   const autorized = res.locals;

  //   const user = await this.model.findById(autorized.id);
  //   if (!user) return res.status(401).json({ message: 'user not found' });

  //   return res.status(200).json({ role: user.role });
  // }
}