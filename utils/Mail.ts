require("dotenv").config()
const nodemailer = require ('nodemailer');
const hbs = require('nodemailer-express-handlebars');

export default class Mail{
    transporter: any;

    constructor(){
        this.transporter = nodemailer.createTransport({
            port: process.env.EMAIL_PORT,
            host:process.env.EMAIL_SMTP,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
            secure: true
        });
        const options = {
            extName: '.hbs',
            viewPath: `${__dirname}/views/email/`,
            layoutsDir: `${__dirname}/views/email/`,
            defaultLayout: 'template'
        }
        this.transporter.use('compile', hbs(options))
    }
    async sendEmail(to: string | null, subject: string, html: string): Promise<any>{
        const data = {
            from: process.env.EMAIL,
            to,
            subject,
            template: 'token-email'
        }

        try{
            return await this.transporter.sendMail(data);
        }catch(err){
            throw err;
        }
    }
}