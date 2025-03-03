import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { ShortenURLUseCase } from "../../application/useCases/url/shortenUrl";
import { RedirectUrlUseCase } from "../../application/useCases/url/redirectUrl";
import { TrackVisitsUseCase } from "../../application/useCases/url/trackVisits";
import { ChangeSlugUseCase } from "../../application/useCases/url/changeSlug";
import { config } from "../../config/env";
import { URL } from "../../domain/entities/URL";

@injectable()
export class URLController {
    constructor(
        @inject(ShortenURLUseCase) private shortenURLUseCase: ShortenURLUseCase,
        @inject(RedirectUrlUseCase) private redirectUrlUseCase: RedirectUrlUseCase,
        @inject(TrackVisitsUseCase) private trackVisitsUseCase: TrackVisitsUseCase,
        @inject(ChangeSlugUseCase) private changeSlugUseCase: ChangeSlugUseCase
    ) {}

    async createShortUrl(req: Request, res: Response) {
        const { originalUrl, shortCode } = req.body;
        // const userId = req.user?.id; // Assume authentication middleware
        if (!originalUrl) {
            return res.status(400).json({ error: "URL is required" });
        }

        if (!URL.validateUrl(originalUrl)) {
            return res.status(400).json({ error: "Invalid URL" });
        }

        try {
            const newUrl = await this.shortenURLUseCase.execute(originalUrl);
            res.json({ shortUrl: `${config.siteUrl}${newUrl.shortId}` });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async redirectToOriginalUrl(req: Request, res: Response) {
        const { shortCode } = req.params;
        try {
            const originalUrl = await this.redirectUrlUseCase.execute(shortCode);
            res.json({ originalUrl: originalUrl });
        } catch (error: any) {
            res.status(404).json({ error: "URL not found" });
        }
    }

    async getTotalViews(req: Request, res: Response) {
        const { shortCode } = req.params;
        try {
            const totalViews = await this.trackVisitsUseCase.execute(shortCode);
            res.json({ totalViews });
        } catch (error: any) {
            res.status(404).json({ error: "URL not found" });
        }
    }

    async changeSlug(req: Request, res: Response) {
        const { shortCode, newSlug } = req.body;
        if (!shortCode || !newSlug) {
            return res.status(400).json({ error: "shortCode and newSlug are required" });
        }

        try {
            await this.changeSlugUseCase.execute(shortCode, newSlug);
            res.status(200).json({ message: "Slug updated successfully" });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}