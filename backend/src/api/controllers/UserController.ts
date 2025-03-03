import { Request, Response } from 'express';
import { GetUserUrlsUseCase } from '../../application/useCases/user/getUserUrlsUseCase';
import { RegisterUserUseCase } from '../../application/useCases/user/registerUserUseCase';
import { DuplicateEmailError } from '../../exceptions/DuplicateEmailError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UserController {
    constructor(
        @inject(GetUserUrlsUseCase) private getUserUrlsUseCase: GetUserUrlsUseCase,
        @inject(RegisterUserUseCase) private registerUserUseCase: RegisterUserUseCase
    ) {}

    async getUserUrls(req: Request, res: Response) {
        const { userEmail } = req.params;
        try {
            const urls = await this.getUserUrlsUseCase.execute(userEmail);
            res.json({ urls });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async register(req: Request, res: Response) {
        const { username, email, password } = req.body;
        try {
            const user = await this.registerUserUseCase.execute({ username, email, password });
            res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    private handleError(res: Response, error: any) {
        if (error instanceof DuplicateEmailError) {
            res.status(400).json({ message: error.message });
        } else if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}
