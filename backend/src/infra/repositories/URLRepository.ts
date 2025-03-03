import mongoose, { Schema } from 'mongoose';
import { injectable } from 'tsyringe';

const UrlSchema = new mongoose.Schema({
    shortId: { type: String, required: true, unique: true},
    originalUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false }
});

const URLModel = mongoose.model("URL", UrlSchema);

@injectable()
export class URLRepository {
    async save(url: any) {
        await URLModel.create(url);
    }

    async findByShortId(shortId: string) {
        return URLModel.findOne({ shortId });
    }

    async updateSlug(shortId: string, newSlug: string) {
        const existingUrl = await URLModel.findOne({ shortId: newSlug });
        if (existingUrl) {
            throw new Error('Slug already exists');
        }
        return URLModel.findOneAndUpdate({ shortId: shortId }, { shortId: newSlug }, { new: true });
    }

    async incrementVisit(shortCode: string) {
        return URLModel.findOneAndUpdate({ shortCode }, { $inc: { visits: 1 } });
    }

    async findOriginalUrlAndIncrementVisits(shortCode: string) {
        return URLModel.findOneAndUpdate(
            { shortId: shortCode },
            { $inc: { views: 1 } },
            { new: true }
        );
    }

    async findByOriginalUrl(originalUrl: string) {
        return URLModel.findOne({ originalUrl });
    }
}
