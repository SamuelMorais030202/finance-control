import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import SequelizeUser from "./SequelizeUser";
import db from '.';

class SequelizeFinances extends Model<InferAttributes<SequelizeFinances>,
InferCreationAttributes<SequelizeFinances>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare value: string;
  declare type: string;
  declare description: string;
}

SequelizeFinances.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
}, {
  sequelize: db,
  modelName: 'finances',
  timestamps: false,
  underscored: true,
});
// belongsTo = pertence a
// hasMany = tem muitos

SequelizeFinances.belongsTo(SequelizeUser, { foreignKey: 'userId' , as: 'user' });
SequelizeUser.hasMany(SequelizeFinances, { foreignKey: 'userId', as: 'finance' });

export default SequelizeFinances;
