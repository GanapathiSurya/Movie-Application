import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor() { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.currentUser;
        if (!user || user?.role != 'admin') {
            throw new ForbiddenException("Can't perform operation, need admin privileges.");
        }
        return true;
    }
}