import { Optional, Model, DataTypes } from 'sequelize';
import sequelize from '../db';

interface ILocal {
    id: number,
    name: string,
    address: string,
    createdAt: Date,
    updatedAt: Date
}

export type LocalCreationAttributes = Optional<ILocal, 'id'>;

export class Local extends Model<ILocal, LocalCreationAttributes>{
    declare id: number;
    declare name: string;
    declare address: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

Local.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        },
    },
    {
        sequelize,
        tableName: 'local',
        modelName: 'local'
    });