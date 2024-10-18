import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/*
a implementação do modulo OnModuleInit informa ao crir do modulo que utiliza
esse service, o nest precisa rodar essa função (na inicialização do modulo).
Usar sempre que quiser rodar uma função na inicialização do modulo
*/
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // ao iniciar o modulo, conectar no mysql
    await this.$connect(); // função do PrismaClient para conectar no banco
  }

  // garantir sempre que a conexão feche quando a aplicação termina. Evita gargalos e acaba com a memoria do server
  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
