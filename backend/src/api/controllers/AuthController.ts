import { Request, Response } from 'express';
import { AuthenticateUserUseCase } from '../../application/useCases/user/authenticateUserUseCase';
import { inject, injectable } from 'tsyringe';

@injectable()
export class AuthController {
    constructor(
        @inject(AuthenticateUserUseCase) private authenticateUserUseCase: AuthenticateUserUseCase
    ) {}   

    async authenticate(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            const { token } = await this.authenticateUserUseCase.execute({ email, password });
            res.status(200).json({ message: 'Authentication successful', token });
        } catch (error) {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    }
}