import { IUsersRepository } from "../../repositories/Users/IUsersRepository";
import { User }  from "../../entities/User";
import generateRandomString from "../../utils/generateRandomString";
import { sendVerificationLinkToEmail } from "../../helpers/sendEmail";

interface ISignupRequestDTO{
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    cpf: string;
    password: string;
}
//contains the business logic
export class SignupService{
    //dependency inversion principle, depende apenas da interface e não da implementação dela
    constructor (private usersRepository: IUsersRepository){}

    async execute(data: ISignupRequestDTO){

        const verificationEmailCode = generateRandomString(30);
        const user = new User(data, verificationEmailCode, false);
        const createdUser = await this.usersRepository.createUser(user);
        
        if(createdUser) await sendVerificationLinkToEmail(createdUser.email, verificationEmailCode);
        else throw new Error("Couldn't create user!");

    }
    
}