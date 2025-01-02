import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from '@users/users.controller';
import { UsersService } from '@users/users.service';
import { UserIdCheckMiddleware } from 'src/midleware/user-id-check.middleware';
import { AuthModule } from '@auth/auth.module';
import { FileModule } from '@app/file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@users/entity/user.entity';

@Module({
  controllers: [UsersController], // inicializa os controllers junto com o modulo (assim cria as rotas)
  providers: [UsersService], // infoma o que será utilizado dentro do módulo

  // 1. importa Outros módulos para serem utilizados dentro do deste módulo
  // 2. cuidado um modulo não pode importar o outro e vice-versa, dependências circulares error (udar o forwardRef  ou re-arquiteturar o código)
  // 3. lembrar de exportar dentro do módulo importado a dependencia que vc quer usar
  imports: [
    forwardRef(() => AuthModule),
    FileModule,
    TypeOrmModule.forFeature([UserEntity]), // informa as entidade somente que esta utilizando nesse modulo
  ], //forwardRef: função usada para resolver dependencia circular
  exports: [UsersService],
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
