import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user.service';
import { NextFunction, Request, Response } from 'express';
import { User } from '../interface/user.interface';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UserService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    const { userId } = req?.session;
    if (userId) {
      const user = await this.usersService.findOne(userId);
      // @ts-ignore
      req.currentUser = user;
    }
    next();
  }
}
