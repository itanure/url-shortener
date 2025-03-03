import bcrypt from 'bcrypt';
import { UserRepository } from '../../../infra/repositories/UserRepository';
import jwt from 'jsonwebtoken';
import { config } from '../../../config/env';
import { inject, injectable } from 'tsyringe';

interface AuthenticateUserDTO {
    email: string;
    password: string;
}

@injectable()
export class AuthenticateUserUseCase {
    constructor(
        @inject(UserRepository) private userRepository: UserRepository
    ){}
    async execute({ email, password }: AuthenticateUserDTO) {
        const user = await this.userRepository.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password!)) {
            console.log(config.jwtSecret);
            const token = jwt.sign({ id: user.email, email: user.email }, config.jwtSecret, { expiresIn: '1h' });
            return { user, token };
        } else {
            throw new Error('Invalid email or password');
        }
    }
}
