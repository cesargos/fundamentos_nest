import { Role } from '@app/enums/role.enum';
import { UpdatePutUserDTO } from '@users/dto/update-put-user.dto';

export const updatePutUserDTO: UpdatePutUserDTO = {
  birth_date: '2000-01-01',
  email: 'joao@hcode.com.br',
  name: 'Joao Rangel',
  password: '123456',
  role: Role.User,
};
