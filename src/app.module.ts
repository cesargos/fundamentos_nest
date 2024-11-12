import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entity/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 1000,
        limit: 100,
      },
    ]),
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),

    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'ilene.considine23@ethereal.email',
          pass: 'xzUGs56YnDDg9xH3V5',
        },
      },
      defaults: {
        from: '"devcesargos" <ilene.considine2@ethereal.email>',
      },
      template: {
        dir: __dirname + '/templates', // path de onde vão estar os templates
        adapter: new PugAdapter(), // proprio do PUG
        options: {
          strict: true,
        },
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserEntity],
      synchronize: process.env.stage === 'local', // Cuidado: NUNCA USAR EM PRODUÇÃO!!! Faz com que apague os dados do banco de dados e crie colunas novas automaticamente de acordo com a entidade
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
