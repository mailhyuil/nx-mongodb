import { UserService } from './user.service';
/*
https://docs.nestjs.com/modules
*/

import { User, UserSchema } from '@mongo/libs';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}