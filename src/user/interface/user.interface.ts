import { Document } from "mongoose";

export class User extends Document {
    readonly name: String;
    readonly email: String;
    readonly password: String;
    readonly role: string;
}