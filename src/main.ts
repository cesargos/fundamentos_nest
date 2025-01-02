import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { LogInterceptor } from '@interceptors/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // methods: ['GET', 'POST'] // configura os metodos permitidos na sua aplicação se for diferente desses ele bloqueia
    // origin: ['cesargos.com.br', 'mobile.cesargos.com.br'],
  });

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
  await app.listen(3001);
}

bootstrap();
