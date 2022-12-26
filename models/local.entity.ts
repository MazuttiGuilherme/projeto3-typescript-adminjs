import { Optional, Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';

interface ILocal {
    id: number,
    name: string,
    format: string,
    pax: number,
    createdAt: Date,
    updatedAt: Date
}

export type LocalCreationAttributes = Optional<ILocal, 'id'>;

export class Local extends Model<ILocal, LocalCreationAttributes>{
    declare id: number;
    declare name: string;
    declare format: string;
    declare pax: number;
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
        createdAt: {
            type: DataTypes.DATE
        },
        format: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pax: {
            type: DataTypes.NUMBER,
            allowNull: false
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