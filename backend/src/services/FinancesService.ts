import FinancesModel from '../models/FinancesModel';
import IFinances from '../Interfaces/Finances/Finances';
// import IFinancesModel from '../Interfaces/Finances/FinancesModel';
import { NewEntity } from '../Interfaces/User/UserModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';

export default class FinancesServices {
  constructor(
    private financesModel = new FinancesModel(),
  ) { }

  public async create(userId : IFinances['userId'], finance : NewEntity<IFinances>)
  : Promise<ServiceResponse<IFinances>> {
    const newFinance = await this.financesModel.create(userId, finance);
    return { status: 'SUCCESSFUL', data: newFinance };
  }

  public async getAllFinances(userId : IFinances['userId'])
  : Promise<ServiceResponse<IFinances[]>> {
    const finances = await this.financesModel.getAllFinances(userId);
    return { status: 'SUCCESSFUL', data: finances };
  }

  public async getTypeFinances(userId: IFinances['userId'], type: IFinances['type'])
  : Promise<ServiceResponse<IFinances[]>> {
    if (type !== 'gain' && type !== 'spent') {
      return { status: 'CONFLICT', data: { message: 'Like it has to be earned or spent' } }
    }

    const finances = await this.financesModel.getTypeFinances(userId, type);
    if (finances === null) {
      return { status: 'NOT_FOUND', data: { message: 'Finance not found' } };
    }

    return { status: 'SUCCESSFUL', data: finances };
  }

  public async updateFinances({ description, type, value, id, userId } : IFinances)
  : Promise<ServiceResponse<IFinances>> {
    if (!id) return { status: 'NOT_FOUND', data: { message: 'Id not found' } };

    const financeFound = await this.financesModel.getById(id);
    if (financeFound === null) return { status: 'NOT_FOUND', data: { message: `${id} not found` } };

    const update = await this.financesModel.updateFinances({ description, type, value, id, userId });
    if (!update) {
      return { status: 'CONFLICT', data: { message: 'There are no updates in finances' } };
    }

    return { status: 'SUCCESSFUL', data: update };
  }

  public async deleteFinance(id : IFinances['id']) : Promise<ServiceResponse<ServiceMessage>> {
    const financeFound = await this.financesModel.getById(id);

    if (financeFound === null) return { status: 'NOT_FOUND', data: { message: `${id} not found` } };

    await this.financesModel.deleteFinance(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finance deleted' } };
  }
}