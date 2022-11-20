import { User } from '../models/user.entity';
import Mail from '../utils/Mail';
const hbs = require('nodemailer-express-handlebars');

class UserController {
    mail: Mail;

    constructor(){
        this.mail = new Mail();
    }
    public async confirmEmail(pin: string): Promise<any>{
        let result = {
            statusCode: 200,
            msg: ''
        };
        try{
            const user = await User.findOne({
                where: {
                    pin
                }
            });
            if(user){
                await User.update({ active: 1, pin: ""}, {
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
    public async sendToken(pin: string | null, email: string | null): Promise<any>{
        this.mail.sendEmail(email, 'Confirmação de e-mail', `
            <h1>Confirmação de e-mail</h1></br>
            <p>Clique no link a seguir para poder confirmar seu e-mail com o pin abaixo. <a 
            href="http://localhost:3000/auth/confirm-email">http://localhost:3000/auth/
            confirm-email</a>.</p>
            <p>PIN: ${pin}</p>
        `)  
    }
}

export default UserController;