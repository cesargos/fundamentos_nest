import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove automaticamente os campos que não estão no DTO
      //  forbidNonWhitelisted: true, // Lança um erro se houver campos não definidos
    }),
  );
  await app.listen(3000);
}
bootstrap();
