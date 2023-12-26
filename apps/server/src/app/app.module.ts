import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BadRequestException, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE, DiscoveryModule } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ValidationError } from 'class-validator';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/server/src/schema.gql'),
      playground: true,
    }),
    PostModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    DiscoveryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transformOptions: { enableImplicitConversion: true },
        whitelist: true,
        enableDebugMessages: true,
        exceptionFactory: (errors: ValidationError[]) => {
          if (errors?.length > 0) {
            const children = errors[0].children;

            if (children?.length > 0) {
              const error = children[0].constraints;
              const keys = Object.keys(error);
              const type = keys[keys.length - 1];
              const message = error[type];
              return new BadRequestException(message);
            }

            const error = errors[0].constraints;
            const keys = Object.keys(error);
            const type = keys[keys.length - 1];
            const message = error[type];
            return new BadRequestException(message);
          }
        },
      }),
    },
  ],
})
export class AppModule {}
