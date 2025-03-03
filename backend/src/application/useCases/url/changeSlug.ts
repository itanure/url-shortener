import { inject, injectable } from 'tsyringe';
import { URLRepository } from '../../../infra/repositories/URLRepository';

@injectable()
export class ChangeSlugUseCase {
    
    constructor(
        @inject(URLRepository) private urlRepository: URLRepository
    ) {}

    async execute(shortId: string, newSlug: string): Promise<void> {
        const existingUrl = await this.urlRepository.findByShortId(newSlug);
        if (existingUrl) {
            throw new Error('Slug already exists');
        }
        await this.urlRepository.updateSlug(shortId, newSlug);
    }
}
