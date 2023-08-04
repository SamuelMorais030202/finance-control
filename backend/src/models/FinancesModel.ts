import SequelizeFinances from '../database/models/SequelizeFinances';
import IFinances from '../Interfaces/Finances/Finances';
import IFinancesModel from '../Interfaces/Finances/FinancesModel';
import { NewEntity } from '../Interfaces/User/UserModel';

export default class FinancesModel implements IFinancesModel {
  private model = SequelizeFinances;

  async getById(id : IFinances['id']) : Promise<IFinances | null> {
    const dbFinances = await this.model.findByPk(id);

    if (dbFinances == null) return null;

    return dbFinances;
  }

  async create(userId : IFinances['userId'], { description, type, value }: NewEntity<IFinances>)
  : Promise<IFinances> {
    const dbFinances : IFinances = await this.model.create({ userId, description, type, value});
    return dbFinances;
  }

  async getAllFinances(userId : IFinances['userId']): Promise<IFinances[]> {
    const dbFinances : IFinances[] = await this.model.findAll({ where: { userId } });
    return dbFinances;
  }
 
  async getTypeFinances(userId: IFinances['userId'], type: IFinances['type']): Promise<IFinances[] | null> {
    const dbFinances : IFinances[] = await this.model.findAll({
      where: { userId, type }
    });

    if (dbFinances == null) return null;
    return dbFinances;
  }

  async updateFinances({ description, type, value, id, userId } : IFinances)
  : Promise<IFinances | null> {
    const [affectedRows] = await this
    .model.update({ description, type, value, userId }, { where: { id } });

    if (affectedRows === 0) return null;

    return this.getById(id);
  }

  async deleteFinance(id: number): Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}