import 'dotenv/config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { OrdersModule } from './orders/orders.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
    }),
    MongooseModule.forRoot(
      process.env.DB_HOST || 'mongodb://localhost:27017/mydatabase',
      {
        connectionFactory: (connection: Connection) => {
          console.log('✅ Connected to MongoDB');
          return connection;
        },
      },
    ),
    UsersModule,
    ProductsModule,
    OrdersModule,
  ],
})
export class AppModule {}
