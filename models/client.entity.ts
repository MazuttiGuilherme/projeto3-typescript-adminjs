import { DataTypes, Model, Optional, STRING } from "sequelize";
import {sequelize} from '../db';

interface IClient {
    id: number;
    name: string;
    email: string;
    company: string;
    password: string;
    role: string;
    active: number;
    pin: string;
    createdAt: Date;
    updatedAt: Date
}

export type ClientCreationAttributes = Optional<IClient, 'id'>;

export class Client extends Model<IClient, ClientCreationAttributes> {
    declare id: number | null;
    declare name: string | null;
    declare email: string | null;
    declare company: string | null;
    declare password: string | null;
    declare role: string | null;
    declare active: number | null;
    declare pin: string | null;
    declare createdAt: Date | null;
    declare updatedAt: Date | null
}

Client.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(70),
            allowNull: false
        },
        company: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('admin', 'Client'),
            allowNull: false,
            defaultValue: 'Client'
        },
        active: {
            type: DataTypes.INTEGER,
            defaultValue: false,
        },
        pin: {
            type: DataTypes.STRING(6),
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }

    },
    {
        sequelize,
        tableName: 'Clientes',
        modelName: 'Client'
    },

)
