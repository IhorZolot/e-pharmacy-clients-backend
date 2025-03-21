import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') || 3000;

  console.log(`🌍 Server started on port ${PORT}`);

  await app.listen(PORT);
}
start();
