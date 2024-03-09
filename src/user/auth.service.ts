import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "./user.service";
import { randomBytes, scrypt } from 'crypto';
import { promisify } from "util";

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async signup(name: string, email: string, password: string) {
        const sameEmailUsers = await this.userService.findByEmail(email)
        if (sameEmailUsers.length) {
            throw new BadRequestException('Email in use');
        }
        // Hash the users password
        // Generate a salt
        const salt = randomBytes(8).toString('hex');
        // Hash the salt and the password together
        const hash = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        // Join the hashed result and the salt together
        const result = salt + '.' + hash.toString('hex');
        // Create a new user and save it
        const user = await this.userService.create(name, email, result);
        return user;
    }

    async signin(email: string, password: string) {
        const [user] = await this.userService.findByEmail(email);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        const [salt, storedHash] = user.password.split('.');
        const hash = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('bad password');
        }
        return user;
    }
}