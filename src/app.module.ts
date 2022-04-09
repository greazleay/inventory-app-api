import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { getConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { config } from 'dotenv';

config();

@Module({
  imports: [CategoryModule, ProductModule, MongooseModule.forRoot(process.env.DB_URL)],
  // imports: [CategoryModule, ProductModule, TypeOrmModule.forRootAsync({
  //   useFactory: async () =>
  //     Object.assign(await getConnectionOptions(), {
  //       autoLoadEntities: true,
  //       useUnifiedTopology: true,
  //     }),
  // })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
