import { User } from '../models/user.entity';


class UserController {
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
        }
        return result;
    }
    public sendEmail(email: string): void{
        //TODO: Criar envio de e-mail com token
    }
}

export default UserController;