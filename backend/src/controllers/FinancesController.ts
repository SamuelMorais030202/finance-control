import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import FinancesServices from '../services/FinancesService';

export default class FinancesController {
  constructor(
    private financesServices = new FinancesServices(),
  ) { }

  public async create(req : Request, res : Response) {
    const userId = Number(res.locals.userId);
    const response = await this.financesServices.create(userId, req.body);
    return res.status(201).json(response.data);
  }

  public async getAllFinances(_req : Request, res : Response) {
    const userId = Number(res.locals.userId);
    const response = await this.financesServices.getAllFinances(userId);
    return res.status(200).json(response.data);
  }

  public async getTypeFinances(req : Request, res : Response) {
    const userId = Number(res.locals.userId);
    const { type } = req.body;
    const response = await this.financesServices.getTypeFinances(userId, type);

    if (response.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(response.status)).json(response.data);
    }

    const sum = response.data.map((finance) => finance.value).reduce((acc, crr) => acc + crr);

    return res.status(200).json({
      finances: response.data,
      total: sum,
    });
  }

  public async updateFinances(req : Request, res : Response) {
    const userId = Number(res.locals.userId);
    const id = Number(req.params.id);
    const data = req.body;

    const update = await this.financesServices.updateFinances({ userId, ...data, id });
    if (update.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(update.status)).json(update.data);
    }

    return res.status(200).json(update.data);
  }

  public async deletedFinance(req : Request, res : Response) {
    const id = Number(req.params.id);
    const response = await this.financesServices.deleteFinance(id);

    if (response.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(response.status)).json(response.data);
    }

    return res.status(200).json(response.data);
  }
}