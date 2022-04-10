import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, getConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { config } from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

config();

@Module({
  imports: [AuthModule, CategoryModule, ProductModule, UsersModule, TypeOrmModule.forRootAsync({
    useFactory: async () =>
      Object.assign(await getConnectionOptions(), {
        autoLoadEntities: true,
        useUnifiedTopology: true,
      }),
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  constructor(private connection: Connection) { }

}
