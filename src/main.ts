import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LogInterceptor } from './interceptors/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // configura os pipelines globais
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove automaticamente os campos que não estão no DTO
      //  forbidNonWhitelisted: true, // Lança um erro se houver campos não definidos
    }),
  );

  // configura a execução do interceptor globalmente
  app.useGlobalInterceptors(new LogInterceptor());

  // inicia a aplicação
  await app.listen(3000);
}

bootstrap();
