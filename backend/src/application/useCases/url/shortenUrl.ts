import { URLRepository } from "../../../infra/repositories/URLRepository";
import { URL } from "../../../domain/entities/URL";
import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from 'uuid';

@injectable()
export class ShortenURLUseCase {
    constructor(
        @inject(URLRepository) private urlRepository: URLRepository
    ) {}
    
    async execute(originalUrl: string, userId?: string) {
        if (!URL.validateUrl(originalUrl)) {
            throw new Error('Invalid URL');
        }

        const existingUrl = await this.urlRepository.findByOriginalUrl(originalUrl);
        if (existingUrl) {
            return existingUrl;
        }

        return this.generateUniqueShortUrl(originalUrl, userId);
    }

    private async generateUniqueShortUrl(originalUrl: string, userId?: string, attempts: number = 0): Promise<URL> {
        const maxAttempts = 5;
        if (attempts >= maxAttempts) {
            throw new Error('Failed to generate a unique shortId');
        }

        const shortId = uuidv4().slice(0, 8);
        const newUrl = URL.create(originalUrl, shortId, userId);

        const existingUrl = await this.urlRepository.findByShortId(shortId);
        if (existingUrl) {
            return this.generateUniqueShortUrl(originalUrl, userId, attempts + 1);
        }

        await this.urlRepository.save(newUrl);
        return newUrl;
    }
}