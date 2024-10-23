import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(), // pega os parametros aplicados a um decorator aplicado em uma função
      context.getClass(), // pega os parametros aplicados a um decorator global (aplicado na classe)
      // context.getArgs(), // pega os parametros aplicados a um decorator de parametros
    ]);

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();

    if (!user)
      throw new InternalServerErrorException(
        'É necessário usar o auth.guard antes do role.guard!!!',
      );

    //isso quando apenas um tipo de role é necessario
    // caso o usuario tenha N roles e seja necessário mais que uma permissão, usar outra lógica
    return requiredRoles.includes(user.role);
  }
}
