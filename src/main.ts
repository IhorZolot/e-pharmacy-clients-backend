import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function start() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') || process.env.PORT || 3000;
  const config = new DocumentBuilder()
    .setTitle('E-Pharmacy')
    .setDescription('E-Pharmacy API')
    .setVersion('1.0.0')
    .addTag('Clients')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(PORT, () =>
    console.log(`🌍 Server started on port ${PORT}`),
  );
}
void start();
