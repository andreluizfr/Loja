import {User} from '../../entities/User.entity';

export interface IUsersRepository{
    createUser(user: User) : Promise <User>;
    deleteUser(userId: string) : Promise <void>;
    verifyEmail(verificationEmailCode: string) : Promise <User | null>;
    updateRefreshToken(email: string, newRefreshToken: string) : Promise <User | null>;
    findByEmail(email: string) : Promise <User | null>;
    findByCpf(cpf: string) : Promise <User | null>;
    findByEmailAndRefreshToken(email: string, refreshToken: string) : Promise <User | null>;
}