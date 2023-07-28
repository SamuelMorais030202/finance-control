import { Router } from 'express';
import loginRouter from './login.routes';
import userRouter from './user.routes';
import financesRouter from './finances.routes';

const router = Router();

router.use('/user', userRouter);
router.use('/finances', financesRouter);
router.use(loginRouter);

export default router;