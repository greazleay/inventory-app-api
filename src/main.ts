import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import helmet from 'helmet';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const whitelist = ['http://localhost:3000', 'https://inv-hub.herokuapp.com'];
  const corsOptions: CorsOptions = {
    credentials: true,
    methods: ['GET', 'DELETE', 'OPTIONS', 'POST', 'PUT'],
    origin: (requestOrigin: string, callback) => {
      if (whitelist.indexOf(requestOrigin) !== -1 || !requestOrigin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  };

  const app = await NestFactory.create(AppModule, { cors: corsOptions });
  app.use(compression());
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }));

  // Swagger Setup
  const config = new DocumentBuilder()
    .setTitle('Inventory App API')
    .setDescription('A simple API for managing inventory')
    .setVersion('1.0')
    .addTag('inventory')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
};

bootstrap();
