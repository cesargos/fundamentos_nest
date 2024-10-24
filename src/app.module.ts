import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [forwardRef(() => UsersModule), forwardRef(() => AuthModule)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
