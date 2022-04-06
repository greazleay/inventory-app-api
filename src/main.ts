import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {CorsOptions} from 'cors';

async function bootstrap() {
  const whitelist = ['http://localhost:3000', 'https://inv-hub.herokuapp.com'];
  const corsOptions = {
    credentials: true,
    methods: ['GET', 'DELETE', 'OPTIONS', 'POST', 'PUT'],
    origin: (requestOrigin: string | undefined, callback) => {
      if (whitelist.indexOf(requestOrigin as string) !== -1 || !requestOrigin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  };

  const app = await NestFactory.create(AppModule, { cors: corsOptions });
  await app.listen(3000);
}
bootstrap();
