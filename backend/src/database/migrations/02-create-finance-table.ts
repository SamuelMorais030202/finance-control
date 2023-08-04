import { DataTypes, Model, QueryInterface } from "sequelize";
import IFinances from "../../Interfaces/Finances/Finances";
export default {
  up(queryInterface : QueryInterface) {
    return queryInterface.createTable<Model<IFinances>>('finances', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      value: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('finances')
  }
} 