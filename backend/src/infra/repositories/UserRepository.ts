import { injectable } from 'tsyringe';
import { User } from '../../domain/entities/User';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    createdAt: Date,
    urls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'URL' }]
});

const UserModel = mongoose.model('User', userSchema);

@injectable()
export class UserRepository {
    async create(user: User) {
        const newUser = new UserModel(user);
        return await newUser.save();
    }

    async findByEmail(email: string): Promise<User | null> {
        return await UserModel.findOne({ email });
    }
}
