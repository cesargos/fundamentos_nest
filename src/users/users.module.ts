import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UsersController], // inicializa os controllers junto com o modulo (assim cria as rotas)
  providers: [UsersService], // infoma o que será utilizado dentro do módulo

  // 1. importa Outros módulos para serem utilizados dentro do deste módulo
  // 2. cuidado um modulo não pode importar o outro e vice-versa, dependências circulares error (udar o forwardRef  ou re-arquiteturar o código)
  // 3. lembrar de exportar dentro do módulo importado a dependencia que vc quer usar
  imports: [PrismaModule],
})
export class UsersModule {}
