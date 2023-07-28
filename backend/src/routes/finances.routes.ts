import { Router, Request, Response } from 'express';
import Validations from '../middlewares/Validations';
import FinancesController from '../controllers/FinancesController';
import Authorized from '../middlewares/Authorized';

const financesRouter = Router();
const financesController = new FinancesController();

financesRouter.post(
  '/',
  Authorized,
  Validations.validateFinances,
  (req : Request, res : Response) => financesController.create(req, res),
);

financesRouter.get(
  '/',
  Authorized,
  (req : Request, res : Response) => financesController.getAllFinances(req, res),
);

financesRouter.get(
  '/type',
  Authorized,
  (req : Request, res : Response) => financesController.getTypeFinances(req, res),
);

financesRouter.put(
  '/:id',
  Authorized,
  Validations.validateFinances,
  (req : Request, res : Response) => financesController.updateFinances(req, res),
);

financesRouter.delete(
  '/:id',
  Authorized,
  (req : Request, res : Response) => financesController.deletedFinance(req, res),
);

export default financesRouter;