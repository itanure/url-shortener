import { inject, injectable } from "tsyringe";
import { URLRepository } from "../../../infra/repositories/URLRepository";

@injectable()
export class RedirectUrlUseCase {
    constructor(
        @inject(URLRepository) private urlRepository: URLRepository
    ) {}

    async execute(shortCode: string) {
        const url = await this.urlRepository.findOriginalUrlAndIncrementVisits(shortCode);
        if (!url) {
            throw new Error('URL not found');
        }
        return url.originalUrl;
    }
}
