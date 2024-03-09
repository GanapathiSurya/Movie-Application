import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './user.controller';
import { AuthService } from './auth.service';
import { CurrentUserMiddleware } from './middleware/user.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

@Module({
    controllers:[
        UsersController
    ],
    imports:[
        MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    ],
    providers: [
        UserService,
        AuthService
    ]
})
export class UserModule { 
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CurrentUserMiddleware).forRoutes('*');
      }
}
