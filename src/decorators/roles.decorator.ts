import { SetMetadata } from '@nestjs/common';
import { Role } from '@app/enums/role.enum';

export const ROLES_KEY = 'roles';

// SetMetadata ele atribui para a metadata com a chave 'roles' o valor de roles
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
