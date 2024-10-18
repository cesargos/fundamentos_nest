import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService], // informa que o primaservice esta sendo usado dentro do modulo
  exports: [PrismaService], // quem importar o modulo vai ter acesso tb aos objetos exportados aqui (dando acesso para quem importar o modulo)
})
export class PrismaModule {}
