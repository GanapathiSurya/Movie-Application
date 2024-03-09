import { IsNotEmpty, IsNumber, IsString, IsUrl, Validate } from "class-validator";
import { MaxValueConstraint } from "./validations";

export class MovieDTO {
    @IsNotEmpty()
    @IsString()
    readonly title: String;

    @IsNotEmpty()
    @IsString()
    readonly genre: String;

    @IsNotEmpty()
    @IsNumber({
        maxDecimalPlaces: 1,
        allowNaN: false,
        allowInfinity: false
    }, {
        message: "Please provide valid numeric rating"
    })
    @Validate(MaxValueConstraint, [5], { message: "Rating cannot exceed 5" })
    readonly rating: number;

    @IsNotEmpty()
    @IsString()
    @IsUrl({}, { message: 'Please provide valid link' })
    readonly link: string;
}