import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interface/user.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel("user") private readonly userModel: Model<User>) { }

    async create(name: string, email: string, password: string) {
        let role = "user"; // By default
        // Check entered email equals admin email
        const adminEmail = process.env.ADMIN_EMAIL;
        if(email == adminEmail) {
            role = "admin"
        }
        const user = await this.userModel.create({ name, email, password, role });
        return user.save();
    }

    async findByEmail(email: string) {
        const user = await this.userModel.find({ email });
        return user;
    }

    findOne(id: number) {
        if (!id) {
            return null;
        }
        return this.userModel.findOne({ where: { id } });
    }
}
