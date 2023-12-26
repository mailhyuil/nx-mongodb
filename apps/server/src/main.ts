import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /** Cookie Parser */
  app.use(cookieParser());
  /** Compression */
  app.use(compression());
  /** Security */
  app.use(helmet({ contentSecurityPolicy: false }));
  /** Logger */
  app.use(morgan('dev'));
  /** CORS */
  app.enableCors();
  /** Global Prefix */
  app.setGlobalPrefix('api/v1');
  /** Port */
  const port = process.env.SERVER_PORT || 3000;
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document); // api path로
  /** Server Listen */
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
