import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import session from 'express-session';
import express from 'express';
import { sequelize, mongooseDb } from './db';
import * as AdminJSSequelize from '@adminjs/sequelize';
import * as AdminJSMongoose from '@adminjs/mongoose';

import { Local } from './models/local.entity';
import { Event } from './models/event.entity';
import { Client } from './models/client.entity';
import bcrypt from "bcrypt";

import { auth } from './routes/auth';
import { dashboard } from './routes/dashboard';

import hbs from 'hbs';
import ClientController from './controllers/ClientController';
import { ReportEvent } from './models/report_event.entity';
import { ReportClient } from './models/report_client.entity';
import { ReportLocal } from './models/report_local.entity';

const path = require('node:path');
const mysqlStore = require('express-mysql-session')(session);

require('dotenv').config()
const bodyParser = require('body-parser');
const PORT = process.env.PORT_HOST;

AdminJS.registerAdapter({
    Resource: AdminJSSequelize.Resource,
    Database: AdminJSSequelize.Database
})

AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database
})

const ROOT_DIR  = __dirname;
const generateResource = (model: object, hideElements: any = null, actions: any = null) => {
    return {
        resource: model,
        options: {
            properties: {
                ...hideElements,
                createdAt: {
                    isVisible: {
                        list: true, edit: false, create: false, show: true
                    }
                },
                updatedAt: {
                    isVisible: {
                        list: true, edit: false, create: false, show: true
                    }
                }
            },
            actions: actions
        }
    }
}

const clientCtrl = new ClientController(ROOT_DIR);

const start = async () => {
    const adminOptions = {
        resources: [
            generateResource(Event),
            generateResource(Local),
            generateResource(ReportLocal),
            generateResource(ReportEvent),
            generateResource(ReportClient),
            generateResource(
                Client,
                {
                    password: {
                        type: 'password',
                        isVisible: {
                            list: false, edit: true, create: true, show: false
                        }
                    },
                    active: {
                        isVisible: {
                            list: true, edit: false, create: false, show: true
                        }
                    }
                },
                {
                    new: {
                        before: async function (request: any) {
                            if (request.payload.password) {
                                request.payload.password = await bcrypt.hash(request.payload.password, 10)
                            }
                            request.payload.pin = (Math.floor(100000 + Math.random() * 900000)).toString();
                           
                            clientCtrl.sendToken(request.payload.pin, request.payload.email, request.payload.name)
                           
                            return request;
                        }
                    },
                    edit: {
                        before: async function (request: any) {
                            if (request.payload.password) {
                                if (request.payload.password.indexOf('$2b$10') === -1 && request.payload.password.length < 40) {
                                    request.payload.password = await bcrypt.hash(request.payload.password, 10)
                                }
                            }
                            return request;
                        }
                    }
                }
            ),
        ],
        rootPath: '/admin',
        dashboard: {
            handle: async () => { },
            component: AdminJS.bundle('./components/dashboard')
        },
        branding: {
            favicon: 'data:image/jpeg;base64,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',
            logo: '',
            companyName: 'Projeto3 turma Back-end'
        }
    };

    const app = express();
    sequelize.sync()
        .then((result) => console.log(''))
        .catch((err) => console.log(err))

        mongooseDb.once("open", () => {
            console.log("Conexão aberta com sucesso");
          })

    const admin = new AdminJS(adminOptions);

    const sessionStore = new mysqlStore({
        connectionLimit: 10,
        password: process.env.DB_PASS,
        client: process.env.DB_CLIENT,
        database: process.env.MYSQL_DB,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        createDatabaseTable: true
    });
    const adminRouter = AdminJSExpress.buildRouter(admin);

    // const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    //     admin,
    //     {
    //        authenticate: async function (email, password) {
    //             const client = await Client.findOne({
    //                where: {
    //                     email: email
    //                 }
    //             });
    //             if (client) {
    //                 const verifica = await bcrypt.compare(password, client.getDataValue('password'));
    //                 if (verifica) {
    //                        if(client.active){
    //                         return client;
    //                     }else{
    //                         clientCtrl.sendToken(client.pin, client.email, client.name)
    //                         return false;
    //                     }
    //                 }
    //             }
    //       return false;
    //         },
    //         cookieName: 'Projeto3',
    //         cookiePassword: 'UBdI6gdXQOMybKEkZtSyXIuP0iJ2GTrl'
    //     },
    //     null,
    //     {
    //         store: sessionStore,
    //         resave: true,
    //         saveUninitialized: true,
    //         secret: 'UBdI6gdXQOMybKEkZtSyXIuP0iJ2GTrl',
    //         cookie: {
    //             httpOnly: process.env.NODE_ENV === 'production',
    //             secure: process.env.NODE_ENV === 'production'
    //         },
    //         name: 'Projeto3',
    //     }
    // );
    
    app.use(express.json())
    hbs.registerPartials(path.join(__dirname, 'views'))
    
    
    app.set('view engine', '.hbs');

    app.use(admin.options.rootPath, adminRouter)

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use("/auth", auth);

    app.listen(PORT, () => {
        console.log("Projeto rodando");
    })
}

start();