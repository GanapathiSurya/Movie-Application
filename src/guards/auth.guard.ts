import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException("Token is not present.");
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SECRET
        }
      );
      request.currentUser = payload;
      return true;
    } catch (err) {
      throw new UnauthorizedException("Token is Invalid or might have been expired.");
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {

    const token = request.headers?.authorization || request.cookies?.access_token || (request.headers.cookie?.split(';')[0])?.trim().split('=')[1] || '';
    return token;
  }
}