import bcrypt from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { UserRepository } from '../../../infra/repositories/UserRepository';
import { User } from '../../../domain/entities/User';
import { DuplicateEmailError } from '../../../exceptions/DuplicateEmailError';

interface RegisterUserDTO {
    username: string;
    email: string;
    password: string;
}

@injectable()
export class RegisterUserUseCase {
    constructor(
        @inject(UserRepository) private userRepository: UserRepository
    ){}

    async execute({ username, email, password }: RegisterUserDTO): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
            throw new DuplicateEmailError();
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(username, email, hashedPassword, new Date(), []);
        await this.userRepository.create(user);
        return user;
    }
}
