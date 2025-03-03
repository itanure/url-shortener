import { inject, injectable } from 'tsyringe';
import { URLRepository } from '../../../infra/repositories/URLRepository';

@injectable()
export class TrackVisitsUseCase {
    constructor(
        @inject(URLRepository) private urlRepository: URLRepository
    ) {}

    async execute(shortId: string): Promise<number> {
        const url = await this.urlRepository.findByShortId(shortId);
        if (!url) {
            throw new Error('Short URL not found');
        }
        return url.views;
    }
}