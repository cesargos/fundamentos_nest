import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from 'src/users/entity/user.entity';

export const User = createParamDecorator(
  <K extends keyof UserEntity>(
    filter: K,
    context: ExecutionContext,
  ): UserEntity[K] | UserEntity => {
    const user: UserEntity = context.switchToHttp().getRequest().user;
    if (user) {
      return filter ? user[filter] : user;
    }
    throw new NotFoundException(
      'Usuário não encontrado no Request. Use o AuthGuard para obter o usuário',
    );
  },
);
