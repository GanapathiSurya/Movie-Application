import { Body, Controller, Get, Post, Req, Res, Session, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { Serialize } from "../interceptors/serialize.interceptor";
import { UserDto } from "./dto/user.dtos";

@Controller('users')
@Serialize(UserDto)
export class UsersController {

    constructor(private authService: AuthService, private jwtService: JwtService) { }

    @Post('/register')
    async signup(@Body() body: CreateUserDto, @Res() res, @Session() session) {
        const user = await this.authService.signup(body.name, body.email, body.password);
        const payload = { id: user.id, email: user.email, role: user.role };``
        const token = await this.jwtService.signAsync(payload);
        session.userId = user.id;
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.ENV === 'production', // Set to true in production for HTTPS
            sameSite: 'strict',
        });
        const userData = JSON.parse(JSON.stringify(user));
        delete userData.password;
        userData.token = token;
        // Add 1 hour to seconds (since JWT token expiresIn set in 1h)
        const expiresIn = 12*60*60; // seconds
        userData.expiresIn = expiresIn;
        return res.send({ message: 'Register successful', user: userData });
    }

    @Post('/signin')
    async signin(@Body() body, @Req() req, @Res() res, @Session() session) {
        const user = await this.authService.signin(body.email, body.password);
        const payload = { id: user.id, email: user.email, role: user.role };
        const token = await this.jwtService.signAsync(payload)
        session.userId = user.id;
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.ENV === 'production', // Set to true in production for HTTPS
            sameSite: 'strict',
        });
        const userData = JSON.parse(JSON.stringify(user));
        delete userData.password;
        userData.token = token;
        // Add 1 hour to seconds (since JWT token expiresIn set in 1h)
        const expiresIn = 12*60*60; // seconds
        userData.expiresIn = expiresIn;
        return res.send({ message: 'Login successful', user: userData });
    }

}