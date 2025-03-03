import { inject, injectable } from 'tsyringe';
import { UserRepository } from '../../../infra/repositories/UserRepository';

@injectable()
export class GetUserUrlsUseCase {
    constructor(
        @inject(UserRepository) private userRepository: UserRepository
    ){}
    async execute(userEmail: string) {
        const user = await this.userRepository.findByEmail(userEmail);
        if (!user) {
            throw new Error('User not found');
        }
        return user.urls;
    }
}
