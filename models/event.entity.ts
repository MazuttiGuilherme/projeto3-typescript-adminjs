import { Optional, Model, DataTypes } from 'sequelize';
import {sequelize} from '../db';

interface IEvent {
    event_id: number,
    name: string,
    local: string,
    event_date: Date,
    format: string,
    pax: number,
    createdAt: Date,
    updatedAt: Date
}

export type EventCreationAttributes = Optional<IEvent, 'event_id'>;

export class Event extends Model<IEvent, EventCreationAttributes>{
    declare event_id: number;
    declare name: string;
    declare local: string;
    declare event_date: Date;
    declare format: string;
    declare pax: number;
    declare createdAt: Date;
    declare updatedAt: Date;
} 

Event.init(
    {
        event_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        local: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'local',
                key: 'id'
            }
        },
        event_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        format: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pax: {
            type: DataTypes.NUMBER,
            allowNull: false,
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
        tableName: 'eventos',
        modelName: 'Event'
    });