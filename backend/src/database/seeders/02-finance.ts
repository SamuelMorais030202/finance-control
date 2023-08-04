import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface : QueryInterface) => {
    await queryInterface.bulkInsert('finances', [
      {
        user_id: 1,
        value: 400,
        type: 'gain',
        description: 'Recebendo aluguel'
      },
      {
        user_id: 2,
        value: 400,
        type: 'gain',
        description: 'Recebendo aluguel'
      },
      {
        user_id: 1,
        value: 50,
        type: 'spent',
        description: 'Conta de telefone'
      }
    ])
  },
  down: async (queryInterface : QueryInterface) => {
    await queryInterface.bulkDelete('finances', {});
  }
}