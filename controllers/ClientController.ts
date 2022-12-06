import { Client } from '../models/client.entity';
import Mail from '../utils/Mail';
const hbs = require('nodemailer-express-handlebars');

class ClientController {
    mail: Mail;

    constructor(rootDir: string | null){
        this.mail = new Mail(rootDir);
    }
    public async confirmEmail(pin: string): Promise<any>{
        let result = {
            statusCode: 200,
            msg: ''
        };
        try{
            const client = await Client.findOne({
                where: {
                    pin
                }
            });
            if(client){
                await Client.update({ active: 1, pin: ""}, {
                    where: {
                        pin
                    }
                });
                result['msg'] = "E-mail verificado com sucesso";
            }else{
                result['msg'] = "Token inválido";
                result['statusCode'] = 400; 
            }
    
        }catch(err){
            result['msg'] = "Um erro ocorreu ao tentar validar o e-mail.";
            result['statusCode'] = 400;
        }
        return result;
    }
    public async sendToken(pin: string | null, email: string | null, name: string | null): Promise<any>{
        try{
            this.mail.sendEmail(email, 'Confirmação de e-mail', 'token-email', {
                pin,
                name,
                url: `http://localhost:3000/auth/confirm-email`
            })  
        }catch(err){
            console.log(`Erro ao enviar e-mail ${err}`);
        }
    }
}

export default ClientController;