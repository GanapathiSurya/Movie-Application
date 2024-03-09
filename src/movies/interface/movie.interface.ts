import { Document } from "mongoose";

export class Movie extends Document {
    readonly title: String;
    readonly genre: String;
    readonly rating: number;
    readonly link: string;
}