import IFinances from './Finances';

export default interface IFinancesModel {
  create(userId : IFinances['userId'], finances : Partial<IFinances>) : Promise<IFinances>;
  getAllFinances(userId : IFinances['userId']) : Promise<IFinances[]>;
  getTypeFinances(userId : IFinances['userId'], type : IFinances['type']) : Promise<IFinances[] | null>;
  deleteFinance(id: IFinances['id']) : Promise<number>;
  getById(id : IFinances['id']) : Promise<IFinances | null>;
}