import { URLRepository } from "../../../infra/repositories/URLRepository";
import { URL } from "../../../domain/entities/URL";
import { inject, injectable } from "tsyringe";

async function getNanoid() {
    const { customAlphabet } = await import('nanoid');
    return customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', 6);
}

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

        const nanoid = await getNanoid();
        const newUrl = URL.create(originalUrl, nanoid(), userId);
        await this.urlRepository.save(newUrl);
        return newUrl;
    }
}