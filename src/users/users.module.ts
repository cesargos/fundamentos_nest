import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserIdCheckMiddleware } from 'src/midleware/user-id-check.middleware';

@Module({
  controllers: [UsersController], // inicializa os controllers junto com o modulo (assim cria as rotas)
  providers: [UsersService], // infoma o que será utilizado dentro do módulo

  // 1. importa Outros módulos para serem utilizados dentro do deste módulo
  // 2. cuidado um modulo não pode importar o outro e vice-versa, dependências circulares error (udar o forwardRef  ou re-arquiteturar o código)
  // 3. lembrar de exportar dentro do módulo importado a dependencia que vc quer usar
  imports: [PrismaModule],
})
export class UsersModule implements NestModule {
  // NestModule é usado para utilizar middleware
  configure(consumer: MiddlewareConsumer) {
    // apply recebe varios middleware separados por virgula
    // forRoutes/exclude recebe varias rotas para aplicar ou não aplicar o middleware
    consumer.apply(UserIdCheckMiddleware).forRoutes({
      path: 'users/:id',
      method: RequestMethod.ALL,
    });
  }
}
