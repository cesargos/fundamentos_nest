import { Role } from '@app/enums/role.enum';
import { CreateUserDTO } from '@users/dto/create-user.dto';

export const createUserDTO: CreateUserDTO = {
  birth_date: '2000-01-01',
  email: 'joao@hcode.com.br',
  name: 'Joao Rangel',
  password: '123456',
  role: Role.User,
};
